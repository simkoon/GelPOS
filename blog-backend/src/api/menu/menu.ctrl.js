import Tables from '../../models/table';

export const addMenu = async (ctx) => {
  const { storeid, value, menuName, menuPrice } = ctx.request.body;

  const menu = await Tables.findByStoreId(storeid);

  console.log('menu값!!', menu);

  //   const newMenu = menu.childMenu.create({
  //     category: value,
  //     name: menuName,
  //     price: menuPrice,
  //   });

  //   menu.push(newMenu);
  try {
    // await menu.save();
    ctx.body = menu;
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
