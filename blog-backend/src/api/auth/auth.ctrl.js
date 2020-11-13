import Joi from 'joi';
import User from '../../models/user';
import Transporter from './Email/registMail';

/*
  POST /api/auth/register
  {
    userid: 'velopert',
    password: 'mypass123'
  }
*/
export const code = async (ctx) => {
  const { email } = ctx.request.body;

  try {
    const existsEmail = await User.findByEmail(email);
    //console.log(existsEmail);
    if (existsEmail) {
      ctx.body = {
        emailoverlap: true,
      };
      return;
    }

    const code = Math.random()
      .toString(36)
      .slice(3)
      .substring(0, 5)
      .toUpperCase();

    console.log(code);
    const info = await Transporter.sendMail({
      // 보내는 곳의 이름과, 메일 주소를 입력
      from: `"GelPos Team" <jos881@naver.com>`,
      // 받는 곳의 메일 주소를 입력
      to: email,
      // 보내는 메일의 제목을 입력
      subject: 'GelPos 인증코드',
      // 보내는 메일의 내용을 입력
      // text: 일반 text로 작성된 내용
      // html: html로 작성된 내용
      //text: 'GELPOS 코드 번호는 ' + code + '입니다.',
      html: `<p>GELPOS 코드 번호는</p>
              <div style="border: 1px solid black; text-align: center; ">
                  <div style="font-size: 50px">${code}</div> 
              </div>
              <p>입니다.</p>
              <p> 인증 코드란에 위 코드를 알맞게 입력해 주세요.</ㅔ>`,
    });

    ctx.body = {
      code: code,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const register = async (ctx) => {
  // Request Body 검증하기
  console.log('body', ctx.request.body);
  const schema = Joi.object().keys({
    userid: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
    username: Joi.string().min(1).max(10),
    email: Joi.string().email().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    //console.log(result);
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { userid, password, email, username } = ctx.request.body;

  try {
    // userid  이 이미 존재하는지 확인
    const existsId = await User.findByUserid(userid);
    if (existsId) {
      ctx.status = 409; // Conflict
      return;
    }

    const existsEmail = await User.findByEmail(email);
    if (existsEmail) {
      ctx.body = {
        emailoverlap: true,
      };
      return;
    }

    const user = new User({
      userid,
      username,
      email,
    });
    await user.setPassword(password); // 비밀번호 설정
    await user.save(); // 데이터베이스에 저장

    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const login = async (ctx) => {
  const { userid, password } = ctx.request.body;

  // userid, password 가 없으면 에러 처리
  if (!userid || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }

  try {
    const user = await User.findByUserid(userid);
    // 계정이 존재하지 않으면 에러 처리
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    // 잘못된 비밀번호
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/auth/check
*/
export const check = async (ctx) => {
  const { user } = ctx.state;
  if (!user) {
    // 로그인중 아님
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};

/*
  POST /api/auth/logout
*/
export const logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};
