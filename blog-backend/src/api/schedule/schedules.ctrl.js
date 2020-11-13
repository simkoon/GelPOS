import Schedule from '../../models/schedule';
import mongoose from 'mongoose';
import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

const sanitizeOption = {
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

export const getScheduleById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    const schedule = await Schedule.findById(id);
    // 포스트가 존재하지 않을 때
    if (!schedule) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.state.schedule = schedule;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnSchedule = (ctx, next) => {
  const { user, schedule } = ctx.state;
  if (schedule.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

/*
  POST /api/posts
  {
    title: '제목',
    body: '내용',
    tags: ['태그1', '태그2']
  }
*/
export const write = async (ctx) => {
  console.log('schedule 서버로 받아오는 생성 데이터', ctx.request.body);
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    storeid: Joi.string().required(),
    title: Joi.string().required(), // required() 가 있으면 필수 항목
    start: Joi.date().required(),
    end: Joi.date().required(),
    category: Joi.string(),
    isAllDay: Joi.boolean(),
    location: Joi.string().optional().allow(null).allow(''),
    dueDateClass: Joi.string().optional().allow(null).allow(''),
    state: Joi.string(),
    //tags: Joi.array().items(Joi.string()).required(), // 문자열로 이루어진 배열
  });

  // 검증 후, 검증 실패시 에러처리
  const result = schema.validate(ctx.request.body);
  console.log(result);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const {
    storeid,
    title,
    start,
    end,
    category,
    isAllDay,
    location,
    dueDateClass,
    state,
    raw,
  } = ctx.request.body;
  const schedule = new Schedule({
    //state.user.nowstore
    storeid,
    title,
    //body: sanitizeHtml(body, sanitizeOption),
    start,
    end,
    category,
    isAllDay,
    location,
    dueDateClass,
    state,
    raw,
    //user: ctx.state.user,
  });
  try {
    await schedule.save();
    ctx.body = schedule;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// html 을 없애고 내용이 너무 길으면 200자로 제한시키는 함수
const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

/*
  GET /api/posts?userid=&tag=&page=
*/
export const list = async (ctx) => {
  // query 는 문자열이기 때문에 숫자로 변환해주어야합니다.
  // 값이 주어지지 않았다면 1 을 기본으로 사용합니다.
  // console.log('list서버에서 받아오는값', ctx.request.body);
  console.log(ctx.params);
  const { storeid } = ctx.params;
  console.log('list서버에서 받아오는 아이디 값', storeid);
  // const page = parseInt(ctx.query.page || '1', 10);

  // if (page < 1) {
  //   console.log(ctx);
  //   ctx.status = 400;
  //   return;
  // }

  // const { tag, userid } = ctx.query;
  // // tag, userid 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
  // const query = {
  //   ...(userid ? { 'user.userid': userid } : {}),
  //   ...(tag ? { tags: tag } : {}),
  // };

  try {
    const schedules = await Schedule.findByStoreid(storeid);
    console.log('데이터에서 나오는 schedule 값', schedules);

    ctx.body = schedules;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/posts/:id
*/
export const read = async (ctx) => {
  ctx.body = ctx.state.schedule;
};

/*
  DELETE /api/posts/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Schedule.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공은 했지만 응답할 데이터는 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  PATCH /api/posts/:id
  {
    title: '수정',
    body: '수정 내용',
    tags: ['수정', '태그']
  }
*/
export const update = async (ctx) => {
  const { id } = ctx.params;
  // write 에서 사용한 schema 와 비슷한데, required() 가 없습니다.
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  // 검증 후, 검증 실패시 에러처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const nextData = { ...ctx.request.body }; // 객체를 복사하고
  // body 값이 주어졌으면 HTML 필터링
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body);
  }
  try {
    const schedule = await Schedule.findByIdAndUpdate(id, nextData, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
    }).exec();
    if (!schedule) {
      ctx.status = 404;
      return;
    }
    ctx.body = schedule;
  } catch (e) {
    ctx.throw(500, e);
  }
};
