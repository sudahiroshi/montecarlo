class montecarlo {

  constructor( elm1, elm2, elm3, elm4, elm5, elm6 ) {
    this.elm1 = elm1;
    this.elm2 = elm2;
    this.elm3 = elm3;
    this.elm4 = elm4;
    this.N = 100;
    this.dots = 0;
    this.outer = 0;
    this.inner = 0;
    this.number = 1000;
    this.dimension = 2;
    this.answer = Math.PI;
    this.elm5 = elm5;
    this.elm6 = elm6;

    this.nums = new Array( this.N );

    this.vc1 = new VCanvas( elm1 );
    this.vc2 = new VCanvas( elm2 );
    this.vc3 = new VCanvas( elm3 );
    this.vc4 = new VCanvas( elm4 );

    this.background();
    this.vc1.forecolor( 0, 50, 50 );

    elm5.innerHTML = "理論値：" + this.answer;

    var timer1 = new vbTimer();
    timer1.interval = 30;
    var nl = new nylon();

    timer1.timer = () => {
      var x_in = new Array( 100 );
      var y_in = new Array( 100 );
      var x_out = new Array( 100 );
      var y_out = new Array( 100 );
      var in_num = 0;
      var out_num = 0;

      this.vc3.beginPath();

      for( var i=0; i<this.N; i++ ) {
        var x = new Array(5);
        var distance = 0;
        for( var j=0; j<this.dimension; j++ ) {
          x[j] = Math.random() * 2.0 - 1.0;
          distance += x[j] * x[j];
        }

        if( distance < 1.0 ){
          x_in[ in_num ] = x[0];
          y_in[ in_num ] = x[1];
          in_num++;
          this.inner++;
        } else {
          x_out[ out_num ] = x[0];
          y_out[ out_num ] = x[1];
          out_num++;
          this.outer++;
        }
        this.dots++;
        var answer = this.inner / this.dots * Math.pow(2,this.dimension);
        this.vc3.lineto( this.dots, answer );
      }
      this.vc3.stroke();

      elm6.innerHTML = "計算値：" + answer;

      this.vc1.beginPath();
      this.vc1.forecolor( 0, 0, 255 );
      for( var i=0; i<in_num; i++ ) this.vc1.pset( x_in[i], y_in[i] );
      this.vc1.stroke();

      this.vc1.beginPath();
      this.vc1.forecolor( 255, 0, 0 );
      for( var i=0; i<out_num; i++ ) this.vc1.pset( x_out[i], y_out[i] );
      this.vc1.stroke();

      if( this.dots >= this.number ) {
        timer1.disable();
        this.dots = 0;
        this.outer = 0;
        this.inner = 0;
      }
    }

    nl.on( "start", ( key, params ) => {
      timer1.enable();
    });
    nl.on( "clear", ( key, params ) => {
      timer1.disable();
      this.vc1.cls();
    });
    nl.on( "max", ( key, params ) => {
      this.number = params["top"];
      this.background();
      this.dots = 0;
      this.outer = 0;
      this.inner = 0;
      this.N = this.number/100;
    });
    nl.on( "dimension", ( key, params ) => {
      this.dimension = params["dimension"];
      this.answer = params["answer"];
      this.background();
      this.dots = 0;
      this.outer = 0;
      this.inner = 0;
      this.N = this.number/100;
      elm5.innerHTML = "理論値：" + this.answer;
    });
  }

  background() {
    this.vc1.cls();
    this.vc2.cls();

    this.vc1.scale( -1.2, 1.2, 2.4, -2.4 );
    this.vc2.scale( -1.2, 1.2, 2.4, -2.4 );

    this.vc2.forecolor( 0, 0, 0 );
    this.vc2.beginPath();
    this.vc2.line( -1.2, 0, 1.2, 0 );
    this.vc2.line( 0, 1.2, 0, -1.2 );
    this.vc2.stroke();

    this.vc3.cls();
    this.vc4.cls();

    this.vc3.scale( -10, this.answer+1, this.number, -2 );
    this.vc4.scale( -10, this.answer+1, this.number, -2 );

    this.vc4.forecolor( 0, 0, 0 );
    this.vc4.beginPath();
    this.vc4.line( -10, this.answer, this.number, this.answer );
    this.vc4.line( 0, 4, 0, 0 );
    this.vc4.stroke();
    this.vc3.lineStart( 0, 0 );
    this.vc3.forecolor( 180, 0, 200, 0.3 );
  }
}

var guisetup = () => {
	var nl = new nylon();
	document.getElementById("start").addEventListener( "click", () => {
		nl.emit( "start", null );
	});
  document.getElementById("clear").addEventListener( "click", () => {
    nl.emit( "clear", null );
  });
  document.getElementById("b02").addEventListener( "click", () => {
    nl.emit( "stop", null );
    nl.emit( "max", { "top":1000 } );
  });
  document.getElementById("b03").addEventListener( "click", () => {
    nl.emit( "stop", null );
    nl.emit( "max", { "top":10000 } );
  });
  document.getElementById("b04").addEventListener( "click", () => {
    nl.emit( "stop", null );
    nl.emit( "max", { "top":100000 } );
  });
  document.getElementById("b05").addEventListener( "click", () => {
    nl.emit( "stop", null );
    nl.emit( "max", { "top":1000000 } );
  });

  document.getElementById("d02").addEventListener( "click", () => {
    nl.emit( "stop", null );
    nl.emit( "dimension", { "dimension":2, "answer":Math.PI } );
  });
  document.getElementById("d03").addEventListener( "click", () => {
    nl.emit( "stop", null );
    nl.emit( "dimension", { "dimension":3, "answer":4.0/3.0*Math.PI } );
  });
  document.getElementById("d04").addEventListener( "click", () => {
    nl.emit( "stop", null );
    nl.emit( "dimension", { "dimension":4, "answer":Math.PI*Math.PI/2.0 } );
  });
  document.getElementById("d05").addEventListener( "click", () => {
    nl.emit( "stop", null );
    nl.emit( "dimension", { "dimension":5, "answer":8.0*Math.PI*Math.PI/15.0 } );
  });
}



window.addEventListener("load", function(e) {
  guisetup();

  var x = new montecarlo(
    document.getElementById('graph1'),
    document.getElementById('graph1b'),
    document.getElementById('graph2'),
    document.getElementById('graph2b'),
    document.getElementById('theory'),
    document.getElementById('answer')
   );

});
