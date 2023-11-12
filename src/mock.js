// 使用 Mock
const Mock = require('mockjs')
//获取mock.Random对象
//使用mockjs模拟数据
//留言信息
Mock.mock('api/latterns/', ()=>{
    var list = [
        {
            No: "0001", title: "Dreaming", 
            content: "In the realm of slumber, where reality yields to the whimsical tapestry of the subconscious, there exists a cherished haven known as \"a sweet dream.\" It is a world woven with threads of delight and draped in hues of serenity. In this ethereal landscape, fanciful scenarios unfold like petals unfurling in a gentle breeze. Vivid and enchanting, a sweet dream transports the dreamer to realms where impossibilities become mere nuances, and the ordinary transforms into the extraordinary. Within its confines, laughter dances with the stars, and whispers of happiness echo through the corridors of the mind. The air is laced with the scent of joy, and the senses are ensconced in the soothing embrace of contentment. As the dreamer navigates this fantastical domain, each moment is a stroke on the canvas of imagination, painting a portrait of bliss that lingers even after the dawn dispels the nocturnal reverie. A sweet dream is not merely a fleeting escape; it is a timeless elixir that leaves an indelible sweetness, a lingering taste of euphoria that resonates long after the waking world takes hold.", 
            poster: {uid: "123456", username: "Pretty"},
        },
        {
            No: "0002", title: "Loving", 
            content: "In the tapestry of human experience, there exists a profound and enduring emotion that transcends the ordinary, known to all as \"a great love.\" It is a force that binds hearts with an invisible thread, weaving a narrative of shared dreams, unspoken understanding, and unwavering support. A great love is more than a fleeting sentiment; it is a commitment to weather life's storms together, a partnership that flourishes in both sunshine and shadow. It is a symphony of emotions, harmonizing joy, patience, and sacrifice. This love is a sanctuary where vulnerabilities find solace, where acceptance is unconditional, and where the passage of time only deepens the connection. In the presence of a great love, hearts beat in unison, creating a melody that resonates through the ages. It is an artful dance between two souls, choreographed with trust and intimacy, and marked by a profound sense of belonging. Such a love transcends the ephemeral and becomes a beacon that illuminates the human experience—a testament to the extraordinary power that resides in the simple yet extraordinary act of caring deeply for another.", 
            poster: {uid: "123456", username: "Pretty"},
        },
        {
            No: "0036", title: "Horsing", 
            content: "The rhythmic percussion of hooves on the earth creates a symphony of sound, a harmony of strength and finesse. Mane and tail become a flowing extension of the wind, caught in the fervor of their shared momentum. The rider's posture exudes a commanding yet elegant presence, a testament to the seamless unity achieved through years of practice and an unspoken language between horse and rider.", 
            poster: {uid: "654321", username: "Derby"},
        },
        {
            No: "0045", title: "Wanderlust",
            content: "Beneath a vast canvas of twinkling stars, wanderlust takes hold—a relentless desire to explore the uncharted. Footprints left on untouched landscapes tell stories of untold adventures. A solitary traveler, guided by the whispers of the wind, embarks on a journey where the only destination is the horizon. Each step is a dance with the unknown, and every sunrise paints a new chapter in the traveler's nomadic tale. In the tapestry of wanderlust, the world becomes a living atlas, and every encounter is a page in the ever-evolving story of exploration.",
            poster: {uid: "123456", username: "Pretty"},
        },
        {
            No: "0058", title: "Resilience",
            content: "In the crucible of adversity, resilience emerges as a beacon of strength. Like a sturdy oak weathering the fiercest storms, the resilient spirit stands unyielding in the face of challenges. Life's trials become opportunities for growth, and setbacks transform into stepping stones toward triumph. The resilient soul, fueled by determination, rises from the ashes of hardship, forging a narrative of courage and tenacity. In the symphony of struggle, resilience is the resounding melody that inspires others to find their own indomitable spirit amid life's tumultuous cadence.",
            poster: {uid: "123456", username: "Pretty"},
        }
    ]
    return list
})
//用户信息
Mock.mock('api/users/', ()=>{
    var list = [
        {uid: "123456", nickname: "Pretty", brief: "smells sweet.", username: "123456", password: "123456", latterns:["0001", "0002", "0045", "0058"]},
        {uid: "654321", nickname: "Derby",  brief: "big raining.",  username: "654321", password: "654321", latterns:["0036"]},
        {uid: "999999", nickname: "Suzika", brief: "nothing here.", username: "999999", password: "999999", latterns:[]}
    ]
    return list
})