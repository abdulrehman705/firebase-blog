import BlogDetails from "@/components/BlogDetails";

const BlogPage = ({ params }: any) => {
  return <BlogDetails id={params.id} />;
};

export default BlogPage;
