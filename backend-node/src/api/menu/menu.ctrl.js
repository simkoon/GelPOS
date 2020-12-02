import Joi from 'joi';
import Tables from '../../models/table';

// 카테고리 추가
export const addCategory = async (ctx) => {
  const schema = Joi.object().keys({
    storeid: Joi.string(),
    categoryname: Joi.string().min(1).max(7),
  });

  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { storeid, categoryname } = ctx.request.body;

  const table = await Tables.findByStoreId(storeid);

  try {
    const newMenu = {
      name: categoryname,
      menu: [],
    };

    table.category.push(newMenu);

    await table.save();
    ctx.body = table.category;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 카테고리 삭제
export const categoryDel = async (ctx) => {
  const { storeid, categoryid } = ctx.request.body;

  const table = await Tables.findByStoreId(storeid);

  // 객체중 가져온 카테고리 아이디와 일치한 객체 찾아주기
  function isCategory(element) {
    if (element.id === categoryid) {
      return element;
    }
  }

  const findCategory = table.category.find(isCategory);

  try {
    findCategory.remove();

    await table.save();

    ctx.body = table.category;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 카테고리 수정
export const categoryUpdate = async (ctx) => {
  const { storeid, categoryid, updatename } = ctx.request.body;

  const table = await Tables.findByStoreId(storeid);

  // 객체중 가져온 카테고리 아이디와 일치한 객체 찾아주기
  function isCategory(element) {
    if (element.id === categoryid) {
      return element;
    }
  }

  const findCategory = table.category.find(isCategory);

  findCategory.name = updatename;

  try {
    await table.save();

    ctx.body = table.category;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const menuAdd = async (ctx) => {
  const { storeid, categoryid, menuName, menuPrice } = ctx.request.body;

  const table = await Tables.findByStoreId(storeid);

  // 객체중 가져온 카테고리 아이디와 일치한 객체 찾아주기
  function isCategory(element) {
    if (element.id === categoryid) {
      return element;
    }
  }

  const findCategory = table.category.find(isCategory);

  const newMenu = {
    name: menuName,
    price: menuPrice,
  };

  findCategory.menu.push(newMenu);
  try {
    await table.save();
    ctx.body = findCategory;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const categoryList = async (ctx) => {
  const { storeid } = ctx.params;

  const { category } = await Tables.findByStoreId(storeid);

  try {
    ctx.body = category;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 메뉴 삭제
export const menuDel = async (ctx) => {
  const { storeid, categoryid, menuid } = ctx.request.body;

  const table = await Tables.findByStoreId(storeid);

  // 객체중 가져온 카테고리 아이디와 일치한 객체 찾아주기
  function isCategory(element) {
    if (element.id === categoryid) {
      return element;
    }
  }

  const findCategory = table.category.find(isCategory);

  // 객체중 가져온 메뉴 아이디와 일치한 객체 찾아주기
  function isMenu(element) {
    if (element.id === menuid) {
      return element;
    }
  }

  const findMenu = findCategory.menu.find(isMenu);

  try {
    findMenu.remove();

    await table.save();

    ctx.body = table.category;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 메뉴 수정
export const menuUpdate = async (ctx) => {
  const {
    storeid,
    categoryid,
    menuid,
    updatename,
    updateprice,
  } = ctx.request.body;

  const table = await Tables.findByStoreId(storeid);

  // 객체중 가져온 카테고리 아이디와 일치한 객체 찾아주기
  function isCategory(element) {
    if (element.id === categoryid) {
      return element;
    }
  }

  const findCategory = table.category.find(isCategory);

  // 객체중 가져온 메뉴 아이디와 일치한 객체 찾아주기
  function isMenu(element) {
    if (element.id === menuid) {
      return element;
    }
  }

  const findMenu = findCategory.menu.find(isMenu);

  findMenu.name = updatename;
  findMenu.price = updateprice;

  try {
    await table.save();

    ctx.body = table.category;
  } catch (e) {
    ctx.throw(500, e);
  }
};
