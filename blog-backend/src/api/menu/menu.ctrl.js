import Joi from 'joi';
import Tables from '../../models/table';

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

  const store = await Tables.findByStoreId(storeid);

  console.log('categoryname', categoryname);

  try {
    const newMenu = {
      name: categoryname,
      menu: [],
    };

    store.category.push(newMenu);

    await store.save();
    ctx.body = store.category;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const addMenu = async (ctx) => {
  const { storeid, value, menuName, menuPrice } = ctx.request.body;

  const menu = await Tables.findByStoreId(storeid);

  console.log('menu값!!', menu);

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
  console.log('프론트에서 서버로 가져오는 그냥 값', ctx.params);

  const { storeid } = ctx.params;

  console.log('프론트에서 서버로 가져오는 가게아이디 값', storeid);

  const { category } = await Tables.findByStoreId(storeid);

  console.log('디비에서 가져오는 메뉴 걊', category);

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
