const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playList = $('.playlist')
const cd = $('.cd')
const player = $('.player')
const playBtn = $('.btn-toggle-play')
const nextBtn = $('btn-next')
const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
          name: "Một Đêm Say",
          singer: "Thịnh Suy",
          path: "https://mp3-s1-zmp3.zmdcdn.me/32d773f747b0aeeef7a1/6121980357253417684?authen=exp=1653012976~acl=/32d773f747b0aeeef7a1/*~hmac=dedeb5a54d82291cd984b821a2d4ba0a&fs=MTY1Mjg0MDE3NjA4OHx3ZWJWNnwxMDA5NjUwNjmUsIC3fDEwMS45OS4xMi4xNDQ",
          image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/c/4/b/0/c4b0da67bae11731685f79432dc462b7.jpg"
        },
        {
          name: "Hôm Nay Tôi Buồn",
          singer: "Phùng Khánh Linh",
          path: "https://mp3-s1-zmp3.zmdcdn.me/58c86f61b925507b0934/4061524407502532887?authen=exp=1653019987~acl=/58c86f61b925507b0934/*~hmac=5319838757ecce36d961da5bd9dabc2e&fs=MTY1Mjg0NzE4Nzg0MXx3ZWJWNnwxMDmUsICzNDmUsICwMzE0fDIyMi4yNTMdUngMTI1LjU3",
          image:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_png/covers/0/8/08193d6fe58d511c3cf519a0cc856c91_1517889125.png"
        },
        {
          name: "Đúng Người Đúng Thời Điểm",
          singer: "Thanh Hung",
          path:
            "https://mp3-s1-zmp3.zmdcdn.me/14033a2d036aea34b37b/3492656630613786320?authen=exp=1653020218~acl=/14033a2d036aea34b37b/*~hmac=5f236e0acc171f449b52d97a288b3e59&fs=MTY1Mjg0NzQxODY4OHx3ZWJWNnwxMDQ4ODkyOTUwfDEdUngNTIdUngMjA3LjQ",
          image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/4/0/6/b/406b5324276ed23168cfc11822039372.jpg"
        },
        {
          name: "Anh Sẽ Đón Em",
          singer: "Nguyên, Trang",
          path: "https://mp3-s1-zmp3.zmdcdn.me/9f622e4f2e0ec7509e1f/276231989067715127?authen=exp=1653020912~acl=/9f622e4f2e0ec7509e1f/*~hmac=4e4ea6fa998dbbc499bb10c8ff5dbfa4&fs=MTY1Mjg0ODExMjA0Mnx3ZWJWNnwwfDIyMi4yNTMdUngMTI1LjU3",
          image:
            "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
          name: "Phi Hành Gia",
          singer: "Raftaar",
          path: "https://ac.zingmp3.vn/v1/web/suggestion-keywords?num=10&query=phi%20h%C3%A0nh%20gia&language=vi&ctime=1652849097&version=1.6.25&sig=b0ad21bcb86e6de1a8ec7c061917d20ce223f3dc6b6da91dd84c0f58a8df3b6c9e9d94e36be32ff0e3e9cf8c7fc9111dd18e5e034ae21cae892ed99272cb31aa&apiKey=88265e23d4284f25963e6eedac8fbfa3",
          image:
            "https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/8/6/d/6/86d68a321a1b7562b1bbf8e37642343a.jpg"
        },
        {
          name: "Ghe Qua",
          singer: "Tofu-Disk",
          path: "./assets/music/Ghe-Qua-Dick-Tofu-PC.mp3",
          image:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/a/e/b/8/aeb88408626df7aef9c92f89afbcc179.jpg"
        },
        {
          name: "Sao Cha Không",
          singer: "Phan Mạnh Quỳnh",
          path: "https://mp3-s1-zmp3.zmdcdn.me/2d287496bfd2568c0fc3/9141546019302212699?authen=exp=1653022168~acl=/2d287496bfd2568c0fc3/*~hmac=af20753f214ecbb31667726282866485&fs=MTY1Mjg0OTM2ODmUsICzM3x3ZWJWNnwxMDmUsICzNDmUsICwMzE0fDIyMi4yNTMdUngMTI1LjU3",
          image:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/f/3/1/e/f31efb0da9bc984d7246866e6d529d78.jpg"
        },
    ],
    defineProperties: function () {
      Object.defineProperty(this, 'currentSong', {
        get: function () {
          return this.songs[this.currentIndex]
        }
      })
    },
    render: function() {
        const htmls= this.songs.map((song, index) => {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url(${song.image})"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3
                    <p class="author">${song.singer}</p>
                </div>
            </div>
            `
        })
        playList.innerHTML = htmls.join('')
    },
    handleEvents: function() {
      const _this = this
      const cdWidth = cd.offsetWidth
      document.onscroll = function() {
        const scrollTop = window.scrollTop || document.documentElement.scrollTop
        const newWidth = cdWidth - scrollTop
        
        cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
        cd.style.opacity = newWidth / cdWidth
      }
      // play music when click button is clicked
      playBtn.onclick = function() {
        if (_this.isPlaying) {
          audio.pause()
        }
        else {
          audio.play()
        }
      }

      audio.onplay = function() {
        _this.isPlaying = true
        player.classList.add('playing')
      }

      audio.onpause = function() {
        _this.isPlaying = false
        player.classList.remove('playing')
      }
    },
    loadCurrentSong : function() {
      heading.textContent = this.currentSong.name
      cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
      audio.src = this.currentSong.path
      console.log(heading, cdThumb, audio)
    },
    
    start: function() {
      // define properties for app
      this.defineProperties()
      // handle changes events
      // handle when user click play button
      this.handleEvents()

      // load current Song
      this.loadCurrentSong()

      this.render()
    }

}
app.start()

