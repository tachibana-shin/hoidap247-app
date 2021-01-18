const router = require("express").Router()

router.route("/posts").get((req, res) => {
  res.json({
    status: "ok",
    posts: [{
      id: 1,
      writer: {
        uuid: "80",
        displayName: "Admin"
      },
      poster: {
        lastTimeModifier: new Date("2020/11/1"),
        subject: "Vật lý",
        classes: 10,
        point: 30,
        contents: "Mọi người giúp em bài này với",
        linker: {
          small: true,
          href: "#",
          urlName: "google.com",
          name: "Google",
          image: "https://google.com/favicon.ico"
        },
        likes: 3,
        comments: 10,
        liked: false,
        firstPost: true
      }
    }, {
      id: 1,
      writer: {
        uuid: "80",
        displayName: "Admin"
      },
      poster: {
        lastTimeModifier: new Date("2020/11/1"),
        subject: "Vật lý",
        classes: 10,
        point: 30,
        contents: "Mọi người giúp em bài này với",
        linker: {
          small: true,
          href: "#",
          urlName: "google.com",
          name: "Google",
          image: "https://google.com/favicon.ico"
        },
        likes: 3,
        comments: 10,
        liked: false,
        firstPost: true
      }
    }, {
      id: 1,
      writer: {
        uuid: "80",
        displayName: "Admin"
      },
      poster: {
        lastTimeModifier: new Date("2020/11/1"),
        subject: "Vật lý",
        classes: 10,
        point: 30,
        contents: "Mọi người giúp em bài này với",
        linker: {
          small: true,
          href: "#",
          urlName: "google.com",
          name: "Google",
          image: "https://google.com/favicon.ico"
        },
        likes: 3,
        comments: 10,
        liked: false,
        firstPost: true
      }
    }, {
      id: 1,
      writer: {
        uuid: "80",
        displayName: "Admin"
      },
      poster: {
        lastTimeModifier: new Date("2020/11/1"),
        subject: "Vật lý",
        classes: 10,
        point: 30,
        contents: "Mọi người giúp em bài này với",
        linker: {
          small: true,
          href: "#",
          urlName: "google.com",
          name: "Google",
          image: "https://google.com/favicon.ico"
        },
        likes: 3,
        comments: 10,
        liked: false,
        firstPost: true
      }
    }, {
      id: 1,
      writer: {
        uuid: "80",
        displayName: "Admin"
      },
      poster: {
        lastTimeModifier: new Date("2020/11/1"),
        subject: "Vật lý",
        classes: 10,
        point: 30,
        contents: "Mọi người giúp em bài này với",
        linker: {
          small: true,
          href: "#",
          urlName: "google.com",
          name: "Google",
          image: "https://google.com/favicon.ico"
        },
        likes: 3,
        comments: 10,
        liked: false,
        firstPost: true
      }
    }, {
      id: 1,
      writer: {
        uuid: "80",
        displayName: "Admin"
      },
      poster: {
        lastTimeModifier: new Date("2020/11/1"),
        subject: "Vật lý",
        classes: 10,
        point: 30,
        contents: "Mọi người giúp em bài này với",
        linker: {
          small: true,
          href: "#",
          urlName: "google.com",
          name: "Google",
          image: "https://google.com/favicon.ico"
        },
        likes: 3,
        comments: 10,
        liked: false,
        firstPost: true
      }
    }, {
      id: 1,
      writer: {
        uuid: "80",
        displayName: "Admin"
      },
      poster: {
        lastTimeModifier: new Date("2020/11/1"),
        subject: "Vật lý",
        classes: 10,
        point: 30,
        contents: "Mọi người giúp em bài này với",
        linker: {
          small: true,
          href: "#",
          urlName: "google.com",
          name: "Google",
          image: "https://google.com/favicon.ico"
        },
        likes: 3,
        comments: 10,
        liked: false,
        firstPost: true
      }
    }]
  })
})

module.exports = router;