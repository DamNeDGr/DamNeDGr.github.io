let newsCount = Math.floor(Math.random() * 16);


const escapeHTML = (string) => {
    const symb = {
        '&': '&amp',
        '<': '&lt',
        '>': '&gt',
        '«': '&gt',
    }
    return string.replace(/[&<>]/g, (tag) => {
        return symb[tag] || tag;
    })
}



const renderNews = (categoryId) => {
    fetch('http://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryId ? categoryId : ''))
        .then(response => response.json())
        .then((responseData) => {
            data = responseData;
            console.log(data);
            
            const mainNews = data.items.slice(newsCount, newsCount + 3);
            const mainNewsContainer = document.querySelector('.articles__big-column')
            const mainNewsContent = document.getElementById('main-news-item');           
            mainNews.forEach((item) => {
            const template = document.createElement('template');
            categoryName = data.categories.find((catName) => catName.id === item.category_id).name;
            sourceName = data.sources.find((sourName) => sourName.id === item.source_id).name;
            template.innerHTML = `
                <article class="main-article">
                    <div class="main-article__image-container">
                    
                    <img src="${ encodeURI(item.image) }" alt="" class="main-article__image">
                    </div>
                    <div class="main-article__content">
                        <span class="article-category main-article__category">${ escapeHTML(categoryName) }</span>
                        <h2 class="main-article__title">${ escapeHTML(item.title) }</h2>
                        <p class="main-article__text">${ escapeHTML(item.description) }</p>
                        <span class="article-source main-article__source">${ escapeHTML(sourceName) }</span>
                    </div>
                </article>
            `
            mainNewsContainer.appendChild(template.content);
        })
            
const smallNews = data.items.slice(newsCount, newsCount + 9);
const smallNewsContainer = document.querySelector('.articles__small-column');
const smallNewsContent = document.getElementById('small-article-item');

smallNews.forEach((item) => {
    const date = new Date(item.date).toLocaleString('ru-RU', {month: 'long', day: 'numeric'});
    sourceName = data.sources.find((sourName) => sourName.id === item.source_id).name;
    const template = document.createElement('template');
    template.innerHTML = `
        <article class="small-article">
            <h2 class="small-article__title">${escapeHTML(item.title)}</h2>
            <p class="small-article__caption">
                <span class="article-date small-article__date">${escapeHTML(date)}</span>
                <span class="article-source small-article__source">${escapeHTML(sourceName)}</span>
            </p>
        </article>
    `
    smallNewsContainer.appendChild(template.content);
})

    })
}