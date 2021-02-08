const Game = ({
  data() {
    return {
      player: 100,
      monster: 100,
      gamerounds: [],
      message: '',
      playing: true,
      specialAttack: false
    }
  },
  watch:{
    gamerounds:{
      deep: true,
      handler(newValue, OldValue){
      this.gameState()
      if(newValue.length % 3 === 0){
        this.specialAttack = true
      } else{
        this.specialAttack = false
      }
    }
  }},
  methods: {
    attack(){
      const playerDamage = Math.floor(Math.random() * 8) + 5;
      this.monster -= playerDamage;
      this.gamerounds.unshift(`Player attacks and deals ${playerDamage}`);
      this.monsterAttack();
    },
    special(){
      const healthDamage = Math.floor(Math.random() * 14) + 10;
      this.monster -= healthDamage;
      this.gamerounds.unshift(`Player attacks and deals ${healthDamage}`);
      this.monsterAttack();
    },
    heal(){
      const healCount = Math.floor(Math.random() * 13) + 8;
      this.gamerounds.unshift(`Player heals health ${healCount}`);
      this.player += healCount;
      if(this.player > 100) this.player = 100;
      this.monsterAttack();
    },
    surrender(){ 
      this.restart();
    },
    restart(){
      this.gamerounds = [];
      this.playing = false;
      this.player = 100;
      this.monster = 100;
    },
    monsterAttack(){
      const monsterDamage = Math.floor(Math.random() * 8) + 8;
      this.player -= monsterDamage;
      this.gamerounds.unshift(`Monster attacks and deals ${monsterDamage}`);
    },
    gameState(){
      if(this.player < 0){
        this.message = 'Monster won';
        this.restart();
      } else if(this.monster < 0){
        this.message = 'Player won';
        this.restart();
      } else if(this.player < 15 && this.monster < 15){
        this.message = 'It is a draw';
        this.restart();
      }
    },
    newGame(){
      this.playing = true;
    }
  },

  });
  
  Vue.createApp(Game).mount('#game');
