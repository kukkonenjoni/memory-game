import { useState } from "react"

function RenderChamps(props) {
    
    const [champions] = useState(props.value)
    const shuffle = (champions) => {
        let shuffled = champions.sort((a,b) => 0.5-Math.random())
        return shuffled
    }
    let images = shuffle(champions)
    images = images.map((champion, index) => {
        let src = "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champion[0] + "_0.jpg"
        return (
            <div className="picture" key={index}>
                <img src = {src} alt={champion[0]} width="300px" height="250px" onClick={(e) => props.btn(e, index, champions)} />
                <h1 className="champion-name">{champion[0]}</h1>
            </div>
        )
    })
    return(
        <div className="pictures">
            {images}
        </div>
    )
}

export default RenderChamps