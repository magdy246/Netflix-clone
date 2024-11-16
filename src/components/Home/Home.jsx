import "./Home.css"
import Header from '../Header/Header'
import PlayingNowList from '../PlayingNowList/PlayingNowList'
import TopRatedList from '../TopRatedList/TopRatedList'
import PopularList from '../PopularList/PopularList'
export default function Home() {
    return (
        <>
            <Header />
            <TopRatedList />
            <PopularList />
            <PlayingNowList />
        </>
    )
}
