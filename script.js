const getAllData = async (searchText) => {
    const getData = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const post = await getData.json();
    const allPost = post;
    displayData(allPost);
    toggleLoadingSpinner(false);
}

function displayData(allPost){
    const posts = allPost.posts;
    // console.log(allPost.posts[3].id)
    // using foreach to run over every element 
    posts.forEach(data => {
        // console.log(data);

        const singlePost = document.getElementById('all-post');
        const div = document.createElement('div');
        div.classList = "flex-grow-0 flex gap-10 flex-col";
        div.innerHTML= `
                    <div class="flex  border border-[#181feb9b] bg-[#797DFC1A] flex-col lg:flex-row rounded-3xl p-10 gap-10">
                    <div class="flex-grow-0 indicator">
                        ${data.isActive ? '<span class="indicator-item badge bg-[#10b981]"></span>' : '<span class="indicator-item badge bg-[#ff3434]"></span>'};
                        <div class="grid w-24 h-24 bg-base-300 place-items-center"><img src="${data.image}" alt=""></div>
                    </div>
                    <div class="flex-grow flex gap-6  flex-col"> 
                    <div class="flex gap-5 text-[#12132DCC] font-medium">
                        <h1> # ${data.category} </h1>
                        <h1>Author:${data.author.name}</h1>
                    </div>
                    <div class="text-3xl font-bold">${data.title}</div>
                    <div class="text-[#12132D99] ">${data.description}</div>
                    <div class="border border-dashed border-gray-500"></div>

                    <div class="flex justify-between items-center">
                        <div class="flex gap-5 text-[#12132D99] ">
                        <h1><i class="fa-regular fa-message pr-3"></i> ${data.comment_count}</h1>
                        <h1><i class="fa-regular fa-eye pr-3"></i> ${data.view_count}</h1>
                        <h1><i class="fa-regular fa-clock pr-3"></i>  </h1>
                        </div>
                        <div>
                            <h1 class="text-2xl cursor-pointer" onclick="markAsRead('${data.title}', '${data.view_count}');"><i class="fa-regular fa-envelope bg-green-500"></i></h1>
                        </div>
                    </div>
                    </div>
                </div>
        `;

        singlePost.appendChild(div);
    });
    toggleLoadingSpinner(false);
}

let clickCount = 0;
function markAsRead(title,view_count){
    // console.log(title,view_count);
    const markRead = document.getElementById('marking-read');
    const div =document.createElement('div');
    div.classList = 'flex justify-between px-3 gap-5 py-8 bg-white rounded-2xl';
    div.innerHTML = `
                <div>
                    <h1 class="font-bold">${title}</h1>
                </div>
                <div>
                    <h1><i class="fa-regular fa-eye pr-3 text-[#12132D99]"></i> ${view_count}</h1>
                </div>
    `;
    markRead.appendChild(div);

    clickCount++
    const counter = document.getElementById('mark-count');
    counter.innerText = clickCount;
}

getAllData('');


function searchHandle(){
    toggleLoadingSpinner(true);
    const allPost = document.getElementById('all-post');
    allPost.textContent ='';
    const searchField = document.getElementById("search-field");
    const searchText2 = searchField.value;
    setTimeout(() => {
        getAllData(searchText2);
    }, 2000);  

}


// Loading spinner 
const toggleLoadingSpinner = (loading) =>{
    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.classList.remove('hidden');
    if(loading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}






// Latest Post 
const latestData = async() =>{
    const getLatestData = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const latestPost = await getLatestData.json();
    const allLatestData =latestPost;
    displayLatestData(allLatestData);
}

function displayLatestData(allLatestData){
        console.log(allLatestData);

        allLatestData.forEach(data => {
           const latestPost = document.getElementById('latest-post');
           const div = document.createElement('div');
           div.innerHTML = `
                        <div class="card  border border-black">
                        <div class="p-4"><img class="rounded-xl" src="${data.cover_image}" alt="Shoes" /></div>
                        <div class="p-4 flex flex-col gap-5 ">
                            <h2 class="#12132D99"><i class="fa-regular fa-calendar fa-fw mr-3"></i>${data.author.posted_date ? data.author.posted_date :'No Date Available' }</h2>
                            <p class="font-bold">${data.title}</p>
                            <p class="text-[#12132D99]">${data.description}</p>
                            <div class="flex gap-5 mt-5">
                                <div>
                                    <div class="avatar">
                                    <div class="w-16 rounded-full">
                                        <img src="${data.profile_image}" />
                                    </div>
                                    </div>
                                </div>
                                <div>
                                <h1 class="font-medium">${data.author.name}</h1>
                                <h1 class="text-[#12132D99]">${data.author.designation ? data.author.designation : 'No Designation'}</h1>
                                </div>
                            </div>
                        </div>
                        </div>
           `;
           latestPost.appendChild(div);
        });

}

latestData();