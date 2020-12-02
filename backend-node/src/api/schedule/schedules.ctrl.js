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

// export const checkOwnSchedule = (ctx, next) => {
//   const { user, schedule } = ctx.state;
//   if (schedule.user._id.toString() !== user._id) {
//     ctx.status = 403;
//     return;
//   }
//   return next();
// };

/*
  POST /api/posts
  {
    title: '제목',
    body: '내용',
    tags: ['태그1', '태그2']
  }
*/
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), // required() 가 있으면 필수 항목
    start: Joi.date().required(),
    end: Joi.date().required(),
    category: Joi.string(),
    isAllDay: Joi.boolean(),
    location: Joi.string().optional().allow(null).allow(''),
    dueDateClass: Joi.string().optional().allow(null).allow(''),
    state: Joi.string(),
    raw: Joi.allow(),
    calendarId: Joi.string(),

    //tags: Joi.array().items(Joi.string()).required(), // 문자열로 이루어진 배열
  });

  // 검증 후, 검증 실패시 에러처리
  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const {
    title,
    start,
    end,
    category,
    isAllDay,
    location,
    dueDateClass,
    state,
    raw,
    calendarId,
  } = ctx.request.body;

  const storeObjectId = ctx.state.user.nowstore;

  const schedule = await Schedule.findByStoreid(storeObjectId);

  const newSchedule = schedule.Schedulelist.create({
    title,
    start,
    end,
    category,
    isAllDay,
    location,
    dueDateClass,
    state,
    raw,
    calendarId,
  });
  newSchedule.id = newSchedule._id;

  schedule.Schedulelist.push(newSchedule);
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
  const { storeid } = ctx.params;

  try {
    const schedules = await Schedule.findByStoreid(storeid);

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
  캘린더 삭제
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;

  const storeObjectId = ctx.state.user.nowstore;

  try {
    const returnSchedule = await Schedule.findByStoreid(storeObjectId);

    returnSchedule.Schedulelist.id(id).remove();

    ctx.status = 204; // No Content (성공은 했지만 응답할 데이터는 없음)
    await returnSchedule.save();
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
  const { id } = ctx.request.body;

  const storeObjectId = ctx.state.user.nowstore;

  const returnSchedule = await Schedule.findByStoreid(storeObjectId);

  returnSchedule.Schedulelist.id(id).remove();

  const {
    title,
    start,
    end,
    category,
    isAllDay,
    location,
    dueDateClass,
    state,
    raw,
    calendarId,
  } = ctx.request.body;

  const schedule = await Schedule.findByStoreid(storeObjectId);

  try {
    await returnSchedule.save();

    const newSchedule = schedule.Schedulelist.create({
      title,
      start,
      end,
      category,
      isAllDay,
      location,
      dueDateClass,
      state,
      raw,
      calendarId,
    });
    newSchedule.id = newSchedule._id;

    schedule.Schedulelist.push(newSchedule);

    ctx.status = 204;
    await schedule.save();
  } catch (e) {
    ctx.throw(500, e);
  }
};
