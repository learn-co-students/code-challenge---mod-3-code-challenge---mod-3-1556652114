document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2519

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const likeBtn = document.querySelector("#like_button")
  const commentList = document.querySelector('#comments')
  const likeCount = document.querySelector('#likes')
  const photoName = document.querySelector('#name')
  const image = document.querySelector('img')
  const commentForm = document.querySelector('#comment_form')

  getData()
  .then(photo => updateElements(photo))

  likeBtn.addEventListener("click", increaseLikes)

  // likeBtn.addEventListener("click", function(event){
  //   event.preventDefault()
  //
  //   const body = {
  //
  //   }
  //
  // })

  function getData() {
    return fetch(imageURL)
    .then(response => response.json())
  }

  function updateElements (photo) {
    image.src = photo.url
    photoName.innerHTML = photo.name
    likeCount.innerHTML = photo.like_count
    photo.comments.forEach((comment) => {
      li = document.createElement('li')
      li.innerHTML = comment.content
      commentList.append(li)
    })
  }

  function clearComments () {
    while (commentList.firstChild) {
      commentList.removeChild(commentList.firstChild)
    }
  }

  function increaseLikes (photo) {
    getData()
    .then(photo => {
      photo.like_count += 1
      clearComments()
      updateElements(photo)
    })
  }




  commentForm.addEventListener('submit', function(event) {
    event.preventDefault()
    const input = document.querySelector("#comment_input")
    const comment = input.value
    li = document.createElement('li')
    li.innerHTML = comment
    commentList.append(li)
    commentForm.reset()


    // const body = {
    //   comment: comment
    // }
    // const bodyString = JSON.stringify(body)

    // postUrl = "https://randopic.herokuapp.com/comments"
    // fetch(postUrl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: bodyString
    // })
    // .then(response => response.json())
    // .then(response => console.log(response))

  })


})
