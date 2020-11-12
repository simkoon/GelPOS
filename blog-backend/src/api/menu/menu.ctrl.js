//import mongoose from 'mongoose';
import {Menu} from '../../models/menu';

export const addMenu = async (ctx) => {
    const { storeId, menuCategory, menuName, menuPrice } = ctx.request.body;
    const menu = new Menu({
        storeId,
        menuCategory,
        menuName,
        menuPrice
    });
    try {
        await menu.save();
        ctx.body = menu;
    } catch(e) {
        ctx.throw(500, e);
    }
}

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