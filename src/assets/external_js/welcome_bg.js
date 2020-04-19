$(document).ready(function() {

    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    // Const Obj declartion 
    let demoBg = {

            jsEle: document.getElementById("bg"),
            jqEle: $('#bg'),
            ctx: undefined, // canvas context

            E: {}, //demoBg elements like players , walls etc 
            w: $(window).width() + 100,
            h: $(window).height() + 100,
            margin: 20,
            frame: 20,
            /* requestAnim frame used to update on "optimized" frame duration, computing various frame length ex : (f1 : 17mls, f2 : 16mls, f3 : 18mls ) let say overrage frame duration is demoBg.frame value and that elements movement = velocity * (( timeNow - timeLast ) / 20 ) */
            displayW: $(window).width(),
            displayH: $(window).height(),
            timeNow: 0,
            init: function() {
                this.ctx = this.jsEle.getContext("2d");

                this.jqEle.attr({
                    width: this.displayW + 'px',
                    height: this.displayH + 'px'
                });

                //player init
                this.E.main = new inyoka;

                this.E.food = {
                        burgers: {
                            curEl: new Array(),
                            nbMax: 50,
                            nb: 0,
                            genInterval: 100, //ms
                            timeLastUpd: 0,
                            autoGen: false,
                            toggleAutoGen: function() {
                                if (this.autoGen) this.autoGen = false;
                                else this.autoGen = true;
                            },
                            generate(timeNow) {
                                this.nb = this.curEl.length;
                                if (!this.autoGen) return false;
                                if (this.nb === this.nbMax) {
                                    this.timeLastUpd = timeNow;
                                    return false
                                }
                                if ((timeNow - this.timeLastUpd) < this.genInterval) return false;

                                this.timeLastUpd = timeNow;
                                this.curEl.push(new burger);
                                this.nb = this.curEl.length;
                            },
                            update() {
                                this.curEl.forEach(function(el, ind) {
                                    //update is movement if needed
                                    el.update();
                                    //IS Collising with main ? 
                                    let iscollising = demoBg.E.main.collision(el.p.x, el.p.y, el.w);

                                    if (iscollising) {
                                        el.getCollideBy(demoBg.E.main);
                                        demoBg.E.food.burgers.curEl.splice(ind, 1);
                                    }
                                })
                            },
                            draw() {
                                for (const element of this.curEl) element.draw();
                            }
                        },
                        salades: { //isaladi en zoulou
                            curEl: new Array(),
                            nbMax: 10,
                            nb: 0,
                            genInterval: 1000, //ms
                            timeLastUpd: 0,
                            autoGen: false,
                            toggleAutoGen: function() {
                                if (this.autoGen) this.autoGen = false;
                                else this.autoGen = true;
                            },
                            generate(timeNow) {
                                if (!this.autoGen) return false;
                                if (this.nb === this.nbMax) {
                                    this.timeLastUpd = timeNow;
                                    return false
                                }
                                if ((timeNow - this.timeLastUpd) < this.genInterval) return false;

                                this.timeLastUpd = timeNow;
                                this.curEl.push(new salade);
                                this.nb = this.curEl.length;
                            },
                            update() {
                                this.curEl.forEach(function(el, ind) {
                                    //update is movement if needed
                                    el.update();
                                    //IS Collising with main ? 
                                    let iscollising = demoBg.E.main.collision(el.p.x, el.p.y, el.w);

                                    if (el.w > el.maxSize) {
                                        demoBg.E.food.salades.curEl.splice(ind, 1)
                                    }

                                    if (iscollising) {
                                        el.getCollideBy(demoBg.E.main);
                                        demoBg.E.food.salades.curEl.splice(ind, 1);
                                    }
                                })
                            },
                            draw() {
                                for (const element of this.curEl) element.draw();
                            }
                        },
                        amandlas: {
                            curEl: new Array(),
                            nbMax: 100,
                            nb: 0,
                            genInterval: 100, //ms
                            timeLastUpd: 0,
                            autoGen: true,
                            toggleAutoGen: function() {
                                if (this.autoGen) this.autoGen = false;
                                else this.autoGen = true;
                            },
                            generate(timeNow) {
                                this.nb = this.curEl.length;
                                if (!this.autoGen) return false;
                                if (this.nb === this.nbMax) {
                                    this.timeLastUpd = timeNow;
                                    return false
                                }
                                if ((timeNow - this.timeLastUpd) < this.genInterval) return false;

                                this.timeLastUpd = timeNow;
                                this.curEl.push(new amandla);
                                this.nb = this.curEl.length;
                            },
                            update() {
                                this.curEl.forEach(function(el, ind) {
                                    //update is movement if needed
                                    el.update();
                                    //IS Collising with main ? 
                                    // let iscollising  = demoBg.E.main.collision( el.p.x, el.p.y, el.w );


                                    // if (el.w > el.maxSize) { demoBg.E.food.amandlas.curEl.splice( ind, 1) }

                                    // if ( iscollising) {
                                    //   el.getCollideBy( demoBg.E.main );
                                    //   demoBg.E.food.amandlas.curEl.splice( ind, 1);
                                    // }                
                                })
                            },
                            draw() {
                                for (const element of this.curEl) element.draw();
                            }
                        }
                    },
                    this.E.wall = {
                        // gonna contain walls rules
                        borders: {
                            on: true,
                            size: 5, //en px
                            curEl: new Array(),
                            init() {
                                //left
                                this.curEl.push(new wall(0, 0, this.size, demoBg.h));
                                // x  y   w   h
                                //top
                                this.curEl.push(new wall(0, 0, demoBg.w, this.size));
                                this.curEl.push(new wall(demoBg.w, 0, this.size, demoBg.h + this.size));
                                this.curEl.push(new wall(0, demoBg.h, demoBg.w + this.size, this.size));
                            },
                            update() {
                                this.curEl.forEach(function(el, ind) {

                                    el.update()
                                })
                            },
                            draw() {
                                //for (const element of this.curEl) element.draw();
                            }
                        }
                    }

                this.E.wall.borders.init();

            },
            update: function(timeNow) {

                this.timeGap = Math.round((timeNow - this.timeNow) * 100) / 100; //keep 2dec
                this.timeRatio = Math.round((this.timeGap / this.frame) * 100) / 100;
                this.timeNow = timeNow;

                this.ctx.clearRect(0, 0, this.displayW, this.displayH); //clear the canvas 

                //Update phase  
                this.E.main.update(timeNow);

                for (const [foodType, element] of Object.entries(this.E.food)) {
                    this.E.food[foodType].update();
                    this.E.food[foodType].generate(timeNow);
                }

                for (const [wallType, element] of Object.entries(this.E.wall)) {
                    this.E.wall[wallType].update();
                }

                //Draw phase
                this.E.main.draw();

                for (const [foodType, element] of Object.entries(this.E.food)) {
                    this.E.food[foodType].draw();
                }

                for (const [wallType, element] of Object.entries(this.E.wall)) {
                    this.E.wall[wallType].draw();
                }
            }
        },

        keys = {
            37: 0,
            38: 0,
            39: 0,
            40: 0
        };


    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    // Class declaration 
    class demoBgElement {

        constructor() {
            this.w = 0;
            this.h = 0;
            this.p = {
                x: 0,
                y: 0
            };
            this.displayPos = {
                x: 0,
                y: 0
            };
            this.v = {
                x: 0,
                y: 0
            };
            this.bgColor = 'lightgrey';
            this.borderColor = 'transparent';
        }

        changeColor(newColor) {
            this.bgColor = newColor;
        }

        growChange(val) {
            this.w += val || 1;
            this.h += val || 1;
        }

        speedChange(val) {
            this.v.x += val || 0.1;
            this.v.y += val || 0.1;
        }

        updateDisplayPos() {

            let a = demoBg.E.main.angle / Math.PI * 180;

            switch (true) {

                case a <= 180 && a >= 90:
                    this.displayPos.x -= (demoBg.E.main.p.x - demoBg.E.main.p.xPrev);
                    this.displayPos.y -= (demoBg.E.main.p.y - demoBg.E.main.p.yPrev);
                    break;
                case a <= 90 && a >= 0:
                    this.displayPos.y -= (demoBg.E.main.p.y - demoBg.E.main.p.yPrev);
                    this.displayPos.x -= (demoBg.E.main.p.x - demoBg.E.main.p.xPrev);
                    break;
                case a <= 0 && a >= -90:
                    this.displayPos.x -= (demoBg.E.main.p.x - demoBg.E.main.p.xPrev);
                    this.displayPos.y -= (demoBg.E.main.p.y - demoBg.E.main.p.yPrev);
                    break;
                case a <= -90 && a >= -180:
                    this.displayPos.y -= (demoBg.E.main.p.y - demoBg.E.main.p.yPrev);
                    this.displayPos.x -= (demoBg.E.main.p.x - demoBg.E.main.p.xPrev);
                    break;

                default:
                    return false;

            }
        }

        defineDisplayPos() {
            const xRef = demoBg.E.main.p.x - demoBg.E.main.displayPos.x;
            const yRef = demoBg.E.main.p.y - demoBg.E.main.displayPos.y;

            this.displayPos.x = this.p.x - xRef;
            this.displayPos.y = this.p.y - yRef;
        }
    }

    class inyoka extends demoBgElement {

        constructor() {
            super();
            this.p = {
                x: 100,
                y: 100,
                xPrev: undefined,
                yPrev: undefined
            };
            this.displayPos = {
                x: demoBg.displayW / 2,
                y: demoBg.displayH / 2,
                xPrev: demoBg.displayW / 2,
                yPrev: demoBg.displayW / 2
            };
            this.w = 20;
            this.h = 20;
            this.v = {
                x: 0,
                y: 0
            };
            this.speeding = 1.5; //additional val on velocity/frame
            this.friction = 0.92; //multi val on velocity/frame
            this.mm = {
                left: 0,
                up: 0,
                right: 0,
                down: 0
            };
            //this.test = { left : 0, up : 0, right : 0, down : 0};
            this.angle = 0;
            this.buffs = []; //see class buffs 
        }



        getAngleByKeys() {
            if (keys[37]) {
                this.mm.left += this.speeding;
                // if (this.mm.left > 10 ) { this.mm.left = 10 };
            }
            /*else{
                        this.mm.left -= this.speeding;
                          if (this.mm.left < 0 ) { this.mm.left = 0 };
                      }*/


            if (keys[38]) {
                this.mm.up += this.speeding;
                // if (this.mm.up > 10 ) { this.mm.up = 10 };
            }
            /*else{
                        this.mm.up -= this.speeding;
                          if (this.mm.up < 0 ) { this.mm.up = 0 };
                      }*/


            if (keys[39]) {
                this.mm.right += this.speeding;
                // if (this.mm.right > 10 ) { this.mm.right = 10 };
            }
            /*else{
                        this.mm.right -= this.speeding;
                          if (this.mm.right < 0 ) { this.mm.right = 0 };
                      }*/


            if (keys[40]) {
                this.mm.down += this.speeding;
                // if (this.mm.down > 10 ) { this.mm.down = 10 };
            }
            /*else{
                        this.mm.down -= this.speeding;
                          if (this.mm.down < 0 ) { this.mm.down = 0 };
                      }*/



            let dat = this;
            $.each(this.mm, function(i, e) {
                //console.log( i , e );

                // console.log( dat.mm[i] );
                if (dat.mm[i] < 0.0001) dat.mm[i] = 0;
                dat.mm[i] *= dat.friction;
            })




            this.v.x = Math.abs(this.mm.right - this.mm.left);
            this.v.y = Math.abs(this.mm.down - this.mm.up);



            //console.log(this.mm);

            if (!keys[37] && !keys[38] && !keys[39] && !keys[40]) return false;
            let step = 10;

            let top = step * this.mm.up;
            let bot = step * this.mm.down;
            let right = step * this.mm.right;
            let left = step * this.mm.left;
            var X = right - left;
            var Y = top - bot;

            var OM = Math.sqrt((X * X) + (Y * Y));
            var transRatio = 180 / Math.PI; // pour passé de l'interval [0 , PI] -> [0 , 180];

            if (OM === 0) return false;
            let angle = Y === 0 ? Math.acos(X / OM) * transRatio : Math.acos(X / OM) * (Y / Math.abs(Y)) * transRatio;

            return angle * Math.PI / 180;
        }

        update(timeNow) {

            this.p.xPrev = this.p.x;
            this.p.yPrev = this.p.y;



            this.updateBuffNerf(timeNow);
            this.applyBuffNerf();


            let newAngle = this.getAngleByKeys();
            if (newAngle !== false) this.angle = newAngle;

            //this.updateSpeedByKeys();



            //mixé les deux systéme ensemble 


            //console.log( {0 : this.angle ,1 : Math.cos(this.angle) , 2 : Math.sin(this.angle)} );
            // console.log( Math.trunc( ( Math.cos(this.angle)  )*100 ) /100 );
            this.p.x += ((this.v.x) * Math.cos(this.angle)) * demoBg.timeRatio;
            // if (this.p.x > demoBg.w ) this.p.x -= demoBg.w;
            // if (this.p.x < 0 ) this.p.x += demoBg.w; 

            this.p.y -= ((this.v.y * Math.sin(this.angle)) * demoBg.timeRatio);
            // if (this.p.y > demoBg.h ) this.p.y -= demoBg.h;
            // if (this.p.y < 0 ) this.p.y += demoBg.h;

        }

        drawVelocity() {
            demoBg.ctx.lineWidth = 3;

            let dvx = (this.p.xPrev - this.p.x) * 7;
            let dvy = (this.p.yPrev - this.p.y) * 7;


            demoBg.ctx.beginPath();
            demoBg.ctx.fillStyle = "red";
            demoBg.ctx.strokeStyle = "red";

            demoBg.ctx.moveTo(this.displayPos.x, this.displayPos.y);
            demoBg.ctx.lineTo(this.displayPos.x - dvx, this.displayPos.y - dvy);
            demoBg.ctx.fill();
            demoBg.ctx.stroke();



            demoBg.ctx.beginPath();
            demoBg.ctx.fillStyle = "blue";
            demoBg.ctx.strokeStyle = "blue";

            demoBg.ctx.moveTo(this.displayPos.x, this.displayPos.y);
            demoBg.ctx.lineTo(this.displayPos.x - dvx, this.displayPos.y);
            demoBg.ctx.fill();
            demoBg.ctx.stroke();


            demoBg.ctx.beginPath();
            demoBg.ctx.fillStyle = "green";
            demoBg.ctx.strokeStyle = "green";

            demoBg.ctx.moveTo(this.displayPos.x, this.displayPos.y);
            demoBg.ctx.lineTo(this.displayPos.x, this.displayPos.y - dvy);
            demoBg.ctx.fill();
            demoBg.ctx.stroke();
        }

        draw() {
            this.defineDisplayPos()
            demoBg.ctx.beginPath();
            demoBg.ctx.arc(this.displayPos.x, this.displayPos.y, this.w, 0, 2 * Math.PI);
            demoBg.ctx.fillStyle = "transparent";
            demoBg.ctx.strokeStyle = "transparent";
            demoBg.ctx.fill();
            demoBg.ctx.stroke();




            demoBg.ctx.font = this.w + "px FreeMono, monospace";
            demoBg.ctx.fillStyle = "transparent";
            demoBg.ctx.textAlign = "center";
            demoBg.ctx.fillText(Math.round((this.w - 20) * 100) / 100, this.displayPos.x, this.displayPos.y + this.h / 4);

            if (this.w - 20 >= 10) {
                alert('WIN !!! (en ' + Math.round(demoBg.timeNow / 1000) + ' secondes )');
                window.location.reload();
            };

            //this.drawVelocity();

        }

        collision( /*p1x, p1y, r1,*/ p2x, p2y, w2, h2 /* this last param is set only if the 2nd element is an rectangle*/ ) {
            if (h2 === undefined) { // CIRCLE TO CIRCLE COLLISION 
                //IMPORTANT !!! w2 for cicle is the actual raduis of the 2nd circle 
                var x, y, r;

                x = this.p.x - p2x;
                y = this.p.y - p2y;
                r = this.w + w2;

                if (r > Math.sqrt((x * x) + (y * y))) {
                    return true;
                } else {
                    return false;
                }
            }

            if (h2 !== undefined) { // CIRCLE TO RECTANGLE COLLISION 
                var distX = Math.abs(this.p.x - p2x - w2 / 2); // dont /2 cause its already
                var distY = Math.abs(this.p.y - p2y - h2 / 2);

                if (distX > (w2 / 2 + this.w)) {
                    return false;
                }
                if (distY > (h2 / 2 + this.w)) {
                    return false;
                }

                if (distX <= (w2 / 2)) {
                    return true;
                }
                if (distY <= (h2 / 2)) {
                    return true;
                }

                var dx = distX - w2 / 2;
                var dy = distY - h2 / 2;
                return (dx * dx + dy * dy <= (this.w * this.w));
            }

        }

        updateBuffNerf(timeNow) {
            for (var i = this.buffs.length - 1; i >= 0; i--) {
                this.buffs[i].update(timeNow);
                if (this.buffs[i].duration <= 0) {
                    this.buffs[i].removeOf(this);
                    this.buffs.splice(i, 1);
                }
            }
        }

        applyBuffNerf() {

            //determine buffs doublons ,which should be set at isApllied = false
            for (var i = this.buffs.length - 1; i >= 0; i--) {
                //this.buffs[i]
                let relevant = true;

                for (var o = this.buffs.length - 1; o >= 0; o--) {
                    //prevent loop over same element
                    if (o === i) continue;
                    //prevent loop over different buff / debuff elements
                    if (this.buffs[i].constructor.name !== this.buffs[o].constructor.name) continue;
                    //weaker buff become irelevant and wont be excecuted
                    if (Math.abs(this.buffs[i].value) < Math.abs(this.buffs[o].value)) {
                        relevant = false;
                        continue
                    }

                    // if value are the same , only first boost is exceuted
                    if (i < o) relevant = false;

                    //doublon dobject construit sur la mme class detecté
                }

                if (relevant) {
                    this.buffs[i].applyOn(this); // would it work ?
                } else {
                    this.buffs[i].removeOf(this); // would it work ?
                }

            }

        }

        //method override
        defineDisplayPos() {

            switch (true) { // X

                case demoBg.w < demoBg.displayW:
                    this.displayPos.x = this.p.x + (demoBg.displayW - demoBg.w) / 2;
                    break;

                    //case no border displayed
                case this.p.x > demoBg.displayW / 2 && this.p.x < (demoBg.w - demoBg.displayW / 2):
                    //super.defineDisplayPos();
                    this.displayPos.x = demoBg.displayW / 2;
                    break;

                    //case left border is displayed
                case this.p.x + demoBg.margin <= demoBg.displayW / 2:
                    this.displayPos.x = this.p.x + demoBg.margin;
                    break;

                    //case left border is displayed
                case this.p.x - demoBg.margin >= (demoBg.w - demoBg.displayW / 2):
                    //possible inter [demoBg.displayW/2 ; demoBg.displayW ]
                    this.displayPos.x = demoBg.displayW - (demoBg.w - this.p.x) - demoBg.margin;
                    break;

                default:
                    console.log("default case");
                    break;
            }

            switch (true) { //Y

                case demoBg.h < demoBg.displayH:
                    this.displayPos.y = this.p.y + (demoBg.displayH - demoBg.h) / 2;
                    break;

                    //case no border displayed
                case this.p.y > demoBg.displayH / 2 && this.p.y < (demoBg.h - demoBg.displayH / 2):
                    //super.defineDisplayPos();
                    this.displayPos.y = demoBg.displayH / 2;
                    break;

                    //case top border is displayed
                case this.p.y + demoBg.margin <= demoBg.displayH / 2:
                    this.displayPos.y = this.p.y + demoBg.margin;
                    break;

                    //case bottom border is displayed
                case this.p.y - demoBg.margin >= (demoBg.h - demoBg.displayH / 2):
                    //possible inter [demoBg.displayW/2 ; demoBg.displayW ]
                    this.displayPos.y = demoBg.displayH - (demoBg.h - this.p.y) - demoBg.margin;
                    break;

                default:
                    console.log("default case");
                    break;
            }

        }
    }

    class food extends demoBgElement {
        constructor(x, y, w, h) {
            super();
            this.p.x = x != null ? parseInt(x) : getRandom(demoBg.w);
            this.p.y = y != null ? parseInt(y) : getRandom(demoBg.h);
            this.w = w != null ? parseInt(w) : 10;
            this.h = h != null ? parseInt(h) : 10;
        }

        draw() {
            this.defineDisplayPos();
            demoBg.ctx.beginPath();
            demoBg.ctx.arc(this.displayPos.x, this.displayPos.y, this.w, 0, 2 * Math.PI);
            demoBg.ctx.fillStyle = this.bgColor;
            demoBg.ctx.strokeStyle = this.borderColor;
            demoBg.ctx.fill();
            demoBg.ctx.stroke();
        }

    }

    class burger extends food {
        constructor(x, y, w, h) {
            super(x, y, w, h);
            this.bgColor = "lightblue";
        }

        update() {
            let a = 1;
        }

        getCollideBy(impactObj) {
            impactObj.growChange(0.2);
            //impactObj.speedChange( 0.2 );
            impactObj.buffs.push(new msBuff(demoBg.timeNow, 1000, 0.5));
            //if ( impactObj.w - 20 >= 100  ) {alert('WIN !!! (en '+ Math.round( demoBg.timeNow/1000 ) +' secondes )');window.location.reload();};

            //impactObj.speedChange( -0.1 )
        }
    }

    class salade extends food {
        constructor(x, y, w, h) {
            super(x, y, w, h);
            this.w = 5;
            this.bgColor = "#ad525a";
            this.maxSize = 50;
        }

        update() {
            this.w += 0.2;
            if (this.w > 30) {

            }
        }

        getCollideBy(impactObj) {
            impactObj.buffs.push(new msNerf(demoBg.timeNow, 1500, -2));
            // impactObj.growChange( -2 );
        }
    }

    class amandla extends food //energy
    {
        constructor(x, y, w, h) {
            super(x, y, w, h);
            this.w = getRandomInt(5, 30);
            this.v = {
                x: 0.5,
                y: 0.5
            };
            this.angle = getRandomInt(-90, 180);
            this.bgColor = "#00adff";
        }

        update() {
            this.p.x += (this.v.x * demoBg.timeRatio) * Math.cos(this.angle);
            if (this.p.x > demoBg.w) this.p.x -= demoBg.w;
            if (this.p.x < 0) this.p.x += demoBg.w;

            this.p.y -= (this.v.y * demoBg.timeRatio) * Math.sin(this.angle);
            if (this.p.y > demoBg.h) this.p.y -= demoBg.h;
            if (this.p.y < 0) this.p.y += demoBg.h;

            this.angle += getRandomInt(-70, 70) / 1000;
        }

        getCollideBy(impactObj) {
            // impactObj.buffs.push( new msNerf( demoBg.timeNow, 1500, -2 ) );
            impactObj.growChange(-1);
            //impactObj.speedChange( -1 );
            if (impactObj.w < 20) {
                impactObj.w = 20;
                impactObj.h = 20;
                impactObj.v = {
                    x: 3,
                    y: 3
                };
            }
            //impactObj.speedChange( -0.1 )
        }
    }

    class wall extends demoBgElement {
        //ici
        constructor(x, y, w, h) {
            super();
            this.bgColor = "transparent";
            this.borderColor = "transparent";
            this.p = {
                x: x,
                y: y
            };
            this.w = w;
            this.h = h;
        }

        getCollideBy(impactObj) {
            //si est sensible au impact alors on lui attribue xPrev et yPrev
            console.log("l'element ", impactObj, " a touché  un mur ");
        }

        update() {
            //foutr la fonction dans la class de l'object wall et itéré ici
            //et enfaite on avance dans le terrain avec le mur quand on se bouge 
            let iscollising = demoBg.E.main.collision(this.p.x, this.p.y, this.w, this.h);

            if (iscollising) {

                console.log('collision on : ', this, Date.now() - 1585048500000);
                let xCollide = demoBg.E.main.collision(this.p.xPrev, this.p.y, this.w, this.h);
                let yCollide = demoBg.E.main.collision(this.p.x, this.p.yPrev, this.w, this.h);

                console.log("Xcol :" + xCollide, "Ycol :" + yCollide);

                this.xCollide = xCollide;
                this.yCollide = yCollide;


                if (this.xCollide) {
                    demoBg.E.main.v.x *= -1;
                    demoBg.E.main.p.x = demoBg.E.main.p.xPrev;
                    demoBg.E.main.p.y = demoBg.E.main.p.yPrev;

                    let oldLeft = demoBg.E.main.mm.left;
                    let oldRight = demoBg.E.main.mm.right;

                    demoBg.E.main.mm.left = oldRight;
                    demoBg.E.main.mm.right = oldLeft;
                }

                if (this.yCollide) {
                    demoBg.E.main.v.y *= -1;
                    demoBg.E.main.p.x = demoBg.E.main.p.xPrev;
                    demoBg.E.main.p.y = demoBg.E.main.p.yPrev;

                    let oldUp = demoBg.E.main.mm.up;
                    let oldDown = demoBg.E.main.mm.down;

                    demoBg.E.main.mm.up = oldDown;
                    demoBg.E.main.mm.down = oldUp;
                }


            };

            //console.log( this.p.x , this.displayPos.x )
        }

        draw() {
            this.defineDisplayPos();


            demoBg.ctx.beginPath();

            demoBg.ctx.translate(this.displayPos.x, this.displayPos.y);
            demoBg.ctx.fillRect(0, 0, this.w, this.h);
            demoBg.ctx.translate(-this.displayPos.x, -this.displayPos.y);

            demoBg.ctx.strokeStyle = "black";
            demoBg.ctx.fill();
            demoBg.ctx.stroke();
        }
    }

    class buff {
        constructor(initTime, duration) {
            this.duration = duration;
            this.timeLastUpd = initTime;
        }

        update(time) {
            if (this.duration === Infinity) return false;
            this.duration -= time - this.timeLastUpd;
            this.timeLastUpd = time;
        }
    }

    class msBuff extends buff {
        constructor(initTime, duration, buffVal) {
            super(initTime, duration);
            this.value = buffVal;
            this.isEffective = false;
        }

        applyOn(obj) {
            if (this.isEffective) return false;
            obj.v.x += this.value;
            obj.v.y += this.value;
            this.isEffective = true;
        }

        removeOf(obj) {
            if (!this.isEffective) return false;
            obj.v.x -= this.value;
            obj.v.y -= this.value;
            this.isEffective = false;
        }
    }

    class msNerf extends msBuff {
        constructor(initTime, duration, buffVal) {
            super(initTime, duration, buffVal);
        }
    }


    function loop(tFrame = 0) {
        requestAnimationFrame(loop);
        demoBg.update(tFrame);
    }

    $(window).on("keydown", function(e) {
        keys[e.keyCode] = true
    }); //left start => 37 38 39 40
    $(window).on("keyup", function(e) {
        keys[e.keyCode] = false
    });


    function collision(p1x, p1y, r1, p2x, p2y, r2) {
        var a, x, y;

        a = r1 + r2;
        x = p1x - p2x;
        y = p1y - p2y;

        if (a > Math.sqrt((x * x) + (y * y))) {
            return true;
        } else {
            return false;
        }
    }

    function getRandom(num) {
        return Math.floor(Math.random() * num);
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////


    function start_bg() {
        demoBg.init();
        loop();
    }

    start_bg();

})