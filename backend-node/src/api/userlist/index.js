import Router from "koa-router";
import * as userlistsCtrl from "./userlist.ctrl";

const userList = new Router();

userList.get("/", userlistsCtrl.userlist);
userList.delete("/:userid", userlistsCtrl.remove);

export default userList;