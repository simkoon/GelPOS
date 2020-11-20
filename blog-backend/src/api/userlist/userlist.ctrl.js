import User from '../../models/user';

export const userlist = async (ctx) => {
    const page = parseInt(ctx.query.page || "1", 10);
  
    if (page < 1) {
      ctx.status = 400;
      return;
    }
  
    const { userid } = ctx.query;
    const query = {
      ...(userid ? { 'users.userid' : userid } : {})
    };
  
    try {
      const userlists = await User.find(query)
        .sort({ _id: -1 })
        .limit(10)
        .skip((page - 1) * 10)
        .exec();
      const userlistCount = await User.countDocuments().exec();
      ctx.set("Last-Page", Math.ceil(userlistCount / 10)); //header에 Last-Page라는 이름으로 값을 저장
      ctx.body = userlists
        .map((users) => users.toJSON())
        .map((users) => ({
          ...users,
          body: removeHtmlAndShorten(users.body)
        }));
    } catch (e) {
      ctx.throw(500, e);
    }
};

export const remove = async (ctx) => {
    const { userid } = ctx.params;
    try {
      await User.findByIdAndRemove(userid).exec();
      ctx.status = 204;
    } catch (e) {
      ctx.throw(500, e);
    }
};