import Blog from '../model/Blog'

//For getting all the blogs present in the database
export const getAllBlogs = async (req, res, next) => {
  let blogs
  try {
    blogs = await Blog.find()
  } catch (err) {
    console.log(err)
  }

  if (!blogs) {
    return res.status(404).json({ message: 'No Blogs found' })
  }
  return res.status(200).json({ blogs })
}

//Adding a blog into our database API
export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body
  const blog = new Blog({
    title,
    description,
    image,
    user
  })
  try {
    await blog.save()
  } catch (err) {
    console.log(err)
  }

  return res.status(200).json({ blog })
}

//Will update the blog
export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body
  const blogId = req.params.id
  let blog
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description
    })
  } catch (err) {
    console.log(err);
  }

  if (!blog) {
    return res.status(500).json({ message: 'Unable to update the blog data!' })
  }

  return res.status(200).json({ blog })
}

//will get the blog via ID
export const getBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    console.log(err);
  }

  if(!blog){
    return res.status(400).json({message:"Blog was not available!"})
  }
  return res.status(200).json({blog});
}


//Deleting Blog
export const deleteBlog=async(req,res,next)=>{
    const id=req.params.id;
    let blog;
    try{
    blog=await Blog.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    if(!blog){
        return res.status(400).json({message:"Unable to delete!"})  
    }

    return res.status(200).json({message:"Deleted Successfully!"})
}