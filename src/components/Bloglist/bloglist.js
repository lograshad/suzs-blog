import { Link } from "react-router-dom";
import '../../screens/Blogs-page/blog.css';
import './BlogList.css';
import { formatDistanceToNowStrict } from "date-fns";
import RenderHtml from "../RenderHtml";

const Bloglist = ({ blog, updateCurse, updateLeave }) => {
    // console.log(formatDistanceToNowStrict(new Date(blog?.date)));
    // console.log(blog?.date.toString());
    let blogBody = blog?.body.slice(0, 200);
    const truncate = blogBody += `...`;
    return (
        <div className="bloglist">
            <div className="blog-preview" key={blog?._id}>
                <div className="blog-text">
                    <div className="writer"><div className="author">zee</div><div className="point">.</div> <div className="date">
                        {new Date(blog?.date).toString() === "Invalid Date" ? blog?.date : formatDistanceToNowStrict(new Date(blog?.date))} ago</div></div>
                    <Link to={`/blog/${blog?.title}`} onMouseOver={updateCurse} onMouseLeave={updateLeave} onClick={updateLeave}>
                        <div className="blog-title">{blog?.title}</div>
                        <div id="p">
                        {/* {blog?.body.slice(0, 200)}... */}
                        <RenderHtml htmlContent={truncate}/>
                        </div>
                    </Link>
                    <div className="blog-stuff">
                        <div className="blog-stats">
                            <Link to={`/genre?name=${blog?.genre}`} onMouseOver={updateCurse} onMouseLeave={updateLeave} onClick={updateLeave}>
                                <div className="genre">{blog?.genre}</div>
                            </Link>
                            <span className="read-time">{blog?.readTime} read</span>
                        </div>
                    </div>
                </div>
                <div className="blog-preview-img-wraper">
                    <div style={{ backgroundImage: `url(${blog?.image})` }}></div>
                </div>
            </div>
        </div>
    );
}

export default Bloglist;