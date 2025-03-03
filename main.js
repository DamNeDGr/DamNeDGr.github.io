//DATA


const categoryId = {
    index: 0,
    fashion: 3,
    tech: 1,
    politics: 4,
    sport: 3,
}

const categoryNames = {
    index: 'Главная',
    fashion: 'Мода',
    tech: 'Технологии',
    politics: 'Политика',
    sport: 'Спорт',
}
/*-------------------------------------*/
//COMPONENTS

const MainArticle = ({title, image, category, description, source}) => {
    return (
        <article className="main-article">
            <div className="main-article__image-container">
                <img src={ image } alt="" className="main-article__image" />
            </div>
            <div className="main-article__content">
                <span className="article-category main-article__category">{ category }</span>
                <h2 className="main-article__title">{ title }</h2>
                <p className="main-article__text">{ description }</p>
                <span className="article-source main-article__source">{ source }</span>
            </div>
        </article>
    )
}


const SmallArticle = ({title, date, source}) => {
    return (
        <article className="small-article">
            <h2 className="small-article__title">{ title }</h2>
            <p className="small-article__caption">
                <span className="article-date small-article__date">
                    {date}
                </span>
                <span className="article-source small-article__source">
                    { source }
                </span>
            </p>
        </article>
    )
}

/*-------------------------------------*/


//MAIN APP

const App = () => {
    const [category, setCategory] = React.useState('index');
    const [articles, setArticles] = React.useState({items: [], categories: [], sources: []});

    const navClick = (e) => {
        e.preventDefault();
        setCategory(e.currentTarget.dataset.href) 
    }

    React.useEffect(() => {
        fetch('http://frontend.karpovcourses.net/api/v2/ru/news/' + categoryId[category] || '')
        .then(response => response.json())
        .then((response) => {
            setArticles(response);
        })
    }, [category])
    
    return (
        <React.Fragment>
            <header className="header">
                <div className="container">
                    <nav className="navigation grid">
                        <a onClick={navClick} data-href="index" href="/" className="navigation__logo"><img src="./img/ico/logo.svg" alt="Logo"/></a>
                        <ul className="navigation__list">
                            {['index', 'fashion', 'tech', 'politics', 'sport'].map((item) => {
                                return (
                                    <li className="navigation__item" key={item}>
                                        <a 
                                        onClick={navClick} 
                                        data-href={item} 
                                        href="#" 
                                        className={`navigation__link ${category === item ? 'navigation__link--active' : ''}`}
                                        >{ categoryNames[item] }</a>
                                    </li>
                                )
                            })}
                            
                            
                        </ul>
                    </nav>
                </div>
            </header>
            <main className="main">
                <section className="articles">
                    <div className="container grid">
                        <section className="articles__big-column">
                            {articles.items.slice(0, 3).map((item) => {
                                return (
                                    <MainArticle
                                        key={item.title}
                                        title={item.title}
                                        image={item.image}
                                        description={item.description}
                                        category={ articles.categories.find(({id}) => item.category_id === id).name }
                                        source={ articles.sources.find(({id}) => item.source_id === id).name }
                                    />
                                    
                                )
                            })}
                        </section>
                        <section className="articles__small-column">
                            {articles.items.slice(3, 13).map((item) => {
                                return (
                                    <SmallArticle 
                                        key={item.title}
                                        title={item.title}
                                        date={new Date(item.date).toLocaleDateString('ru-RU',{month: 'long', day: 'numeric'})}
                                    />
                                )
                            })}
                        </section>
                    </div>
                </section>
            </main>
            <footer className="footer">
                <div className="container">
                    <nav className="navigation grid footer__navigation">
                        <a onClick={navClick} href="/" data-href="index" className="navigation__logo"><img src="./img/ico/logo.svg" alt="Logo"/></a>
                        <ul className="navigation__list">
                            {['index', 'fashion', 'tech', 'politics', 'sport'].map((item) => {
                                return (
                                    <li className="navigation__item" key={item}>
                                        <a 
                                        onClick={navClick} 
                                        data-href={item} 
                                        href="#" 
                                        className={`navigation__link ${category === item ? 'navigation__link--active' : ''}`}
                                        >{ categoryNames[item] }</a>
                                    </li>
                                )
                            })} 
                        </ul>
                    </nav>
                </div>
            </footer>
        </React.Fragment>
        )
}

ReactDOM.render(<App />, document.getElementById('root'));
