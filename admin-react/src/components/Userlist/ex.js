{/* 참고용 */}

const PostItem = ({ post }) => {
    const { publishedDate, user, tags, title, body, _id } = post;
    return (
        <PostItemBlock>
            <h2><Link to={`/@${user.username}/${_id}`}>{title}</Link></h2>
            <SubInfo username={user.username} publishedDate={new Date(publishedDate)}/>
            <Tags tags={tags}/>
            <p>{body}</p>
        </PostItemBlock>
    );
};

const PostList = ({posts, loading, error, showWriteButton}) => {
    if(error){
        return <PostListBlock>에러가 발생했습니다.</PostListBlock>
    }
    return (
        <PostListBlock>
            <WritePostButtonWrapper>
                {showWriteButton && (
                <Button cyan to="/write">
                    새 글 작성하기
                </Button>
                )}
            </WritePostButtonWrapper>
            {!loading && posts && (
            <div>
                {posts.map(post => (
                    <PostItem post={post} key={post._id}/>
                ))}
            </div>
            )}
        </PostListBlock>
    );
};