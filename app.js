const blogContainer=document.querySelector('.blog');
const addNewBlog=document.querySelector('.btn--add-item');

const api='http://localhost:3000/api/posts';
const apiBase='http://localhost:3000/';

window.onload=()=>{
    buildPosts();
}
buildPosts();
async function getPosts(){
    const posts=await fetch(api,{
        method:'GET'
    });
    const data=await posts.json();
    return data;
}

function buildPosts(){
    getPosts().then(res=>{
        let BlogPostContent=``;
        res.map(el => {
            console.log(BlogPostContent);
            let content=el.content;
            let title=el.title;
            let postLink=`/post.html?id=${el.id}`;
            if(title.length>30){
                title=title.substr(0,30)+'...';
            }
            if(content.length>180){
                content=content.substr(0,240)+'...';
            }
            BlogPostContent+=`                
            <a class="post-link" href="${postLink}">
                <div class="blog__card blog__card--${el.id}">
                    <h4 class="blog__head">${title}</h4>
                    <p class="blog__content">${content}</p>
                </div>
            </a>`
        });
        blogContainer.innerHTML=BlogPostContent;
    });

}


addNewBlog.addEventListener('click',()=>{
    window.location.assign('./newPost.html');
})
