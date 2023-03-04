// fetch All data

const fethcData = (isSort, limit) => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then((data) => {
            showAllData(data.data.tools, limit,isSort);
        });
};



// show All data

const showAllData = (dataTools, limit, isSort) => {
    // data = dataTools
    const cardcontainer = document.getElementById('card-container');
    const seeMoreBtn = document.getElementById('seeMore');
    cardcontainer.textContent = '';
    if (isSort) {
        dataTools = dataTools.sort(customSort);
    }
    if (limit === 6 && dataTools.length > 6) {
        dataTools = dataTools.slice(0, 6);
        toggleSpiner(false);
        seeMoreBtn.classList.remove('hidden');
    } else {
        seeMoreBtn.classList.add('hidden');
        toggleSpiner(false);
    }



    dataTools.forEach(data => {

        const { id, image, features, name, published_in } = data;

        const featureArray = features.map(feature => {
            return `<li>${feature}</li>`;
        });
        const feature = featureArray.join('');

        cardcontainer.innerHTML += `
        <div class="card bg-base-100 shadow-xl relative">
                    <figure class="px-5 pt-10">
                      <img src=${image}  class="rounded-xl" / style="height:200px">
                    </figure>
                    <div class="card-body">
                      <h3 class="card-title">Features</h3>
                      <ol id="features" class="list-decimal ml-4">
                       ${feature}
                      </ol>
                      <span class="w-full h-[2px] bg-gray-200 my-5"></span>
                      <h3 class="card-title">${name}</h3>
                      <p class="text-gray-500"><i class=" mr-2 fa-regular fa-calendar-days"></i> ${published_in} </p>
                    </div>
                    <label for="my-modal-3" onclick="fetchDetailsData('${id}')"  class="text-red-400 px-3 py-2 right-2 bottom-8 rounded-full text-center bg-slate-100 absolute"><i class="fa-solid fa-right-long"></i></label>
                    
                  </div>
        `;

    });
};
// console.log(sort);

// fetch details data
const fetchDetailsData = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url).then(res => res.json()).then(data => showDetails(data.data));
};

// show details in modal body
const showDetails = data => {

    const { description, pricing, features, integrations, image_link, input_output_examples } = data;

    console.log(data);
    // features
    let featureName = '';
    const featuresArray = Object.values(features);
    const feature = featuresArray.map(data => {
        return `<li>${data.feature_name}</li>`;
    });
    featureName = feature.join('');

    // intergerion
    let integration = '';
    if (Array.isArray(integrations)) {
        const integrationsArray = integrations.map(integrations => {
            return `<li>${integrations}</li>`;
        });
        integration = integrationsArray.join('');
    } else {
        integration = 'no data found';
    }


    document.getElementById('modal-body').innerHTML = `
    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <div class="card border-2 border-red-300 rounded-2xl shadow-xl p-8 bg-red-100">
    <p>${description}</p>
    <div class="grid grid-cols-3 mt-5">
    <div>
    <p>${pricing !== null ? pricing[0].price : 'no'}</p>
    <p>${pricing !== null ? pricing[0].plan : 'no'}</p>
    </div>
    <div>
    <p>${pricing !== null ? pricing[0].price : 'no'}</p>
    <p>${pricing !== null ? pricing[0].plan : 'no'}</p>
    </div>
    <div>
    <p>${pricing !== null ? pricing[0].price : 'no'}</p>
    <p>${pricing !== null ? pricing[0].plan : 'no'}</p>
    </div>
    
    
    </div>
    <div class="grid grid-cols-2 gap-4">
        <div>
        <h3>Features</h3>
        <ul id="features" class="list-disc ml-4">
        ${featureName}
       </ul>
        </div >
    <div>
        <h3>Integrations</h3>
        <ul id="intergration" class="list-disc ml-4">
         ${integration}
       </ul>
    </div>
    </div >

    </div >
    <div class="card border-1 border-red-200 shadow-xl rounded-2xl">
        <figure class="px-5">
            <img src=${image_link[0]} class="rounded-xl" / style="height:250px">
        </figure>
        
    </div>

`;

};


// spinner 
const toggleSpiner = isLoading => {
    const spinner = document.getElementById('loader');
    if (isLoading) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
};

//Sort by date 
document.getElementById('shortByDate').addEventListener('click', function () {
    fethcData(true)
});


const customSort = (a, b) => {
    const dateA = new Date(a.published_in);
    const dateB = new Date(b.published_in);
    if (dateA < dateB) {
        return 1;
    } else if (dateA > dateB) {
        return -1;
    } else {
        return 0;
    }
};

// seemore btn
document.getElementById('seeMore').addEventListener('click', function () {
    fethcData();
    toggleSpiner(true);
});

// const fetchAllData = () => {
//     fetch('https://openapi.programming-hero.com/api/ai/tools')
//         .then(res => res.json())
//         .then(data => showAllData(data.data.tools));
// };


fethcData(false, 6);