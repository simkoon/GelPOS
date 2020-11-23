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
    //console.log(result);
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

  function isCategory(element) {
    console.log('element', element);
    if (element.id === categoryid) {
      return element;
    }
  }

  console.log('categoryid', categoryid);

  const findCategory = table.category.find(isCategory);
  console.log('table.category', findCategory);

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

  console.log('updatename', updatename);

  const table = await Tables.findByStoreId(storeid);

  function isCategory(element) {
    console.log('element', element);
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

export const addMenu = async (ctx) => {
  const { storeid, value, menuName, menuPrice } = ctx.request.body;

  const menu = await Tables.findByStoreId(storeid);

  const newMenu = menu.menu.create({
    category: value,
    name: menuName,
    price: menuPrice,
  });

  menu.menu.push(newMenu);
  try {
    await menu.save();
    ctx.body = menu;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const menuList = async (ctx) => {
  const { storeid } = ctx.params;

  const { category } = await Tables.findByStoreId(storeid);

  try {
    ctx.body = category;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// export const addCategory = async (ctx) => {
//     const { storeId, categoryName } = ctx.request.body;
//     const category = new Category({
//         storeId,
//         categoryName
//     });
//     try {
//         await category.save();
//         ctx.body = category;
//     } catch(e) {
//         ctx.throw(500, e);
//     }
// }
