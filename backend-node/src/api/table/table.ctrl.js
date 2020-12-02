import Joi from 'joi';
import Tables from '../../models/table';

// 테이블 리스트 뽑아오기
export const tableList = async (ctx) => {
  const { storeid } = ctx.params;

  const { table } = await Tables.findByStoreId(storeid);

  try {
    ctx.body = table;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 테이블 추가
export const addTable = async (ctx) => {
  const schema = Joi.object().keys({
    storeid: Joi.string(),
    tablename: Joi.string().min(1).max(8),
  });

  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { storeid, tablename } = ctx.request.body;

  const store = await Tables.findByStoreId(storeid);

  try {
    const newTable = {
      name: tablename,
      nowMenu: [],
    };

    store.table.push(newTable);

    await store.save();
    ctx.body = store.table;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 테이블 삭제
export const tableDel = async (ctx) => {
  const { storeid, tableid } = ctx.request.body;

  const store = await Tables.findByStoreId(storeid);

  // 객체중 가져온 카테고리 아이디와 일치한 객체 찾아주기
  function isTable(element) {
    if (element.id === tableid) {
      return element;
    }
  }

  const findTable = store.table.find(isTable);

  try {
    findTable.remove();

    await store.save();

    ctx.body = findTable;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 테이블 수정
export const tableUpdate = async (ctx) => {
  const { storeid, tableid, newtablename } = ctx.request.body;

  const store = await Tables.findByStoreId(storeid);

  // 객체중 가져온 카테고리 아이디와 일치한 객체 찾아주기
  function istable(element) {
    if (element.id === tableid) {
      return element;
    }
  }

  const findTable = store.table.find(istable);

  findTable.name = newtablename;

  try {
    await store.save();

    ctx.body = store.table;
  } catch (e) {
    ctx.throw(500, e);
  }
};
