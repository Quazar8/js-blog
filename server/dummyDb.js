const { genId, getDate, getRandom } = require('./utils')

const genUsers = () => {
    const users = ['nick2', 'Carlos', 'Revenge',
    'Patrick', 'Liam', 'Randal']
    const password = 'hello'
    const result = {}

    for (let user of users) {
        result[user] = {
            password,
            posts: [],
            profilePic: '/server/images/user_default.png'
        }
    }

    return result
}

const genPost = ( usersDb, idBytes ) => {
    const defaultPic = 'server/images/post_default.jpg'
    const titleWords = ['Lorem', 'ipsum', 'dolor' , 'sit', 
    'amet', 'consectetur', 'adipiscing', 'elit', 'Ut', 'sit',
    'amet', 'odio', 'sed', 'ligula', 'accumsan', 'sodales',
    'Orci', 'varius', 'natoque', 'penatibus', 'et', 'magnis']

    const genTitle = (lower, upper) => {
        let titleLen = getRandom(lower, upper)
        let arr = new Array(titleLen)
        for (let i = 0; i < titleLen; i++)
        {
            let randInd = getRandom(0, titleWords.length - 1)
            let word = titleWords[randInd]
            word = word[0].toUpperCase() + word.substring(1)

            arr[i] = word
        }

        return arr.join(" ")
    }

    const users = Object.keys(usersDb)
    const authorId = users[getRandom(0, users.length - 1)]
    const title = genTitle(3, 7)
    const content = 'Lorem ipsum dolor sit amet, '+ 
    'consectetur adipiscing elit. '+
    'Ut sit amet odio sed ligula accumsan sodales. '+
    'Orci varius natoque penatibus et magnis dis '+
    'parturient montes, '+
    'nascetur ridiculus mus. Aliquam nec vulputate '+
    'tellus, finibus commodo ex. Ut malesuada dolor '+
    'sapien, aliquam convallis ligula euismod in. '+
    'Mauris faucibus ultricies mauris, eu auctor enim '+ 
    'finibus vitae. Sed viverra ultricies nisi vel '+ 
    'porta. Praesent euismod aliquam mauris, in '+
    'mollis leo maximus id. Aenean sed diam at '+
    'lacus efficitur volutpat. Morbi elementum '+
    'mollis sodales. Vestibulum ut enim viverra, '+
    'interdum nunc vitae, porttitor lorem. Vestibulum '+ 
    'ut lorem scelerisque, ornare massa in, ornare '+
    'neque.' +
    'Integer dignissim laoreet commodo. Pellentesque '+ 
    'interdum euismod sapien, id rhoncus quam '+
    'scelerisque ac. Duis porttitor nisl mauris, ut '+ 
    'accumsan mi imperdiet non. Aenean non massa '+
    'sollicitudin, lobortis risus posuere, rhoncus '+ 
    'eros. Suspendisse potenti. Suspendisse sed '+ 
    'scelerisque est. Cras aliquam est nisi, a '+ 
    'porta lectus ullamcorper ut. Donec et metus '+ 
    'massa. Integer maximus vulputate volutpat. '+ 
    'Ut placerat nibh est, id posuere tortor lacinia '+ 
    'eget. Sed vitae ornare est. Ut pharetra '+
    'porttitor arcu, et placerat tellus dignissim '+
    'vitae. Vivamus et porta felis, eget vestibulum '+
    'lorem. Nunc vel dui ac metus venenatis bibendum. '+ 
    'Sed vel interdum lectus, vitae tristique velit. '+ 
    'Etiam ut velit a erat dignissim gravida vitae '+ 
    'id orci.'

    const post = {
        postId: genId(idBytes),
        title,
        content,
        authorId,
        thumbnail: "\\" + defaultPic,
        date: getDate(),
        comments: [],
        starsBy: []
    }

    return post
}

const genDummyDb = () => {
    const postIdBytes = 8
    const postsLimit = 20
    const Users = genUsers()
    const Posts = {}

    for (let i = 0; i < postsLimit; i++) {
        const post = genPost(Users, postIdBytes)
        const { authorId, postId } = post

        Users[authorId].posts.push(postId)
        Posts[postId] = post
    }

    const Comments = {}

    return {
        Users,
        Posts,
        Comments,
    }
}

module.exports = genDummyDb