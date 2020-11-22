import client from './client';
import qs from 'qs';

export const listUserlists = ({page, userid, username, email}) => {
    const queryString = qs.stringify({
        page,
        userid,
        username,
        email,
    });
    return client.get(`/userlist?${queryString}`);
}