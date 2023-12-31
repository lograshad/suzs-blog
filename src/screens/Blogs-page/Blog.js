import Bloglist from "../../components/Bloglist/bloglist";
import { useState, useEffect } from "react";
import searchBtn from "../../images/searchbtn.png";
import Footer from "../../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from "../../components/Skeleton-Screens/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlog, searchBlog } from "../../actions/blogActions";
import Pagination from "../../components/pagination";
import NavBar from "../../components/Navbar/Navbar";
import Circle from "../../components/Circle";
import "./blog.css";
import ErrorImage from "../../components/404Image/404Image";

const Blog = ({ updateCurse, updateLeave }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBlog({ id }));
    }, [dispatch, id]);

    const blogs = useSelector((state) => state?.blogStore?.blogs);
    const blogsData = useSelector((state) => state?.blogStore);

    const { loading, error } = blogsData;

    const searchedData = useSelector((state) => state?.searchBlog?.searched);
    const searchedState = useSelector((state) => state?.searchBlog);

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        dispatch(searchBlog({ searchTerm: `${searchTerm}` }));
    }

    function next() {
        const nextId = Number(id) + 1
        navigate(`/blogs/${nextId}`);
    }
    function previouse() {
        const previouseId = Number(id) - 1
        if (id <= 0) {
            return
        }
        navigate("/blogs/" + previouseId);
    }

    return (
        <div className="blogs-container">
            <NavBar
                updateCurse={updateCurse}
                updateLeave={updateLeave}
            />
            <Circle />
            <div className="sticky">
                <Footer 
                updateCurse={updateCurse}
                updateLeave={updateLeave}
                />
            </div>
            <div className="search-bar">
                <input onChange={handleSearch} placeholder="Search" type="search" />
                <button>
                    <img src={searchBtn} alt="search button" />
                </button>
            </div>
            {loading ? (
                <Skeleton />
            ) : error ? (
                <ErrorImage/>
            ) : (
                <div className="bloglist-wrapper">{blogs?.map((blog) => {
                    return <Bloglist blog={blog} key={blog._id} updateCurse={updateCurse} updateLeave={updateLeave}/>
                })}</div>
            )}
            <Pagination currentPage={id} next={next} previouse={previouse} updateCurse={updateCurse} updateLeave={updateLeave}/>
        </div>
    );
}

export default Blog;