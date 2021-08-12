const api='http://localhost:3000/api/posts';
const apiBase='http://localhost:3000/';



window.onload=()=>{
    buildIndividualPost();
}

const getPostId=()=>{
    const queryStr=window.location.search;
    const urlParms=new URLSearchParams(queryStr);
    return urlParms.get("id");
}

async function getPostData() {
    const id=getPostId();
    let post=await fetch(`${api}/${id}`,{
        method:'GET'
    });
    const data=await post.json();
    return data;
}



const buildIndividualPost=()=>{
    getPostData().then((post)=>{
        let timeStamp=parseInt(post.added_date);
        let date=new Date(timeStamp);
        let postDate=`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
        
        const heroImage=document.querySelector('.hero--article');
        heroImage.style.backgroundImage=`linear-gradient(to top,#2A2A2A,transparent),url('${apiBase}${post.post_image}')`;
        console.log(`${apiBase}${post.post_image}`);

        const articleBody=document.querySelector('.article__container');
        let content=
        `
        <div class="article__main">
            <h1 class="article__title">
                ${post.title}
            </h1>
            <p class="article__date">Posted on <span class="post-date">${postDate}</span></p>
            <p class="article__content">
                ${post.content}
            </p>
        </div>
        `
        articleBody.innerHTML=content;
    });
}