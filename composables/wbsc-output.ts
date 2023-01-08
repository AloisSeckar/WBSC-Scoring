/* *************************************** */
/* wbsc-output.js                          */
/* Final rendering based on user's input   */
/* *************************************** */

import { WBSCInput, WBSCOutput } from "./useInputStore";

// rendering the output
//   battingOrder - number displayed at the left side (1-4)
//   mainInput - 1st action to be displayed
//   extraInput - possible concecutive actions (0-3)
//   clear - true, if previous content should be ereased
function renderAction(battingOrder: number, mainInput: WBSCInput, extraInput: WBSCInput[] | null, clear: boolean) {

    console.debug("WBSC - rendering action for input:");
    console.debug(mainInput);

    if (clear) {
        drawBackground(battingOrder);
    }

    const output = mainInput.output;
    if (output.origBase && output.origBase > 0) {
        let prevOutput: WBSCOutput = getEmptyOutput();
        prevOutput.base = output.origBase;
        if (output.previousAdvance) {
            if (mainInput.tie === true) {
                prevOutput.text1 = 'TIE';
            } else {
                prevOutput.text1 = '*';
            }
        }
        renderAdvance(prevOutput);
    }
    
    if (output.out === true) {
        renderOut(output);
        useEvalStore().outs.push({batter:battingOrder, base:mainInput.base})
    } else {
        renderAdvance(output);

        if (output.errorTarget !== null) {
            drawExtraErrorAdvanceIfNeeded(mainInput.base, output.errorTarget);
        }
        
        if (extraInput !== null) {
            for (let i = 0; i < extraInput.length; i += 1) {
                renderAction(battingOrder, extraInput[i], null, false);
                if (!extraInput[i].specAction.includes("N")) {
                    drawConnector(output.base, extraInput[i].base);
                }
            }
        }
    }
}

// process 'safe' situation
function renderAdvance(output: WBSCOutput) {
    drawAdvanceLine(Math.max(output.base, output.errorTarget));
    writeSituation(output);
}

// process 'out' situation
function renderOut(output: WBSCOutput) {
    if (output.text1 !== 'LT') {
        drawOutCircle(output.base);
    }
    writeSituation(output);
}

// prepare empty scoresheet element (blue square)
//   battingOrder - number displayed at the left side (1-4)
function drawBackground(battingOrder: number) {
    const ctx = useCanvasStore().ctx
    if (ctx) {
        const hOffset = useCanvasStore().hOffset;
        const vOffset = useCanvasStore().vOffset;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0 + vOffset, w1 + hOffset, h1);
        
        ctx.lineWidth = 8;
        ctx.strokeStyle = '#00a7d7';
        
        ctx.strokeRect(4, 4 + vOffset, hOffset, h1 - 8);
        
        ctx.font = 'bold 60px Verdana';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#00a7d7';
        ctx.fillText(battingOrder.toString(), 40,  h2 + 25 + vOffset);
        
        ctx.strokeRect(4 + hOffset, 4 + vOffset, w1 - 8, h1 - 8);
        
        ctx.lineWidth = 4;
        
        ctx.beginPath();
        ctx.moveTo(w2 + hOffset, 0 + vOffset);
        ctx.lineTo(w2 + hOffset, h3 + vOffset);
        ctx.stroke();
        ctx.moveTo(w2 + hOffset, h1 + vOffset);
        ctx.lineTo(w2 + hOffset, h1 - h3 + vOffset);
        ctx.stroke();
        ctx.moveTo(0 + hOffset, h2 + vOffset);
        ctx.lineTo(w3 + hOffset, h2 + vOffset);
        ctx.stroke();
        ctx.moveTo(w1 + hOffset, h2 + vOffset);
        ctx.lineTo(w1 - h3 + hOffset, h2 + vOffset);
        ctx.stroke();
    } else {
        createError("Canvas context not defined")
    }
}

// draw circle at given base (0-4)
function drawOutCircle(base: number) {
    const ctx = useCanvasStore().ctx
    if (ctx) {
        const hOffset = useCanvasStore().hOffset;
        const vOffset = useCanvasStore().vOffset;

        ctx.lineWidth = 7;
        ctx.strokeStyle = 'black';
        
        ctx.beginPath();
        switch (base) {
            case 0:
            case 1:
                ctx.arc(h2 + hOffset, h2 + vOffset, h2 - 15, 0, 2 * Math.PI);
                break;
            case 2:
                drawAdvanceLine(1);
                ctx.moveTo(h2 - 38 + hOffset + h3 - 12, h2 - 38 + vOffset);
                ctx.arc(h2 - 38 + hOffset, h2 - 38 + vOffset, h3 - 12, 0, 2 * Math.PI);
                break;
            case 3:
                drawAdvanceLine(2);
                ctx.moveTo(w4 + hOffset + h5, h2 + vOffset);
                ctx.arc(w4 + hOffset, h2 + vOffset, h5, 0, 2 * Math.PI);
                break;
            case 4:
                drawAdvanceLine(3);
                ctx.moveTo(w4 + hOffset + h5, h4 * 3 + vOffset);
                ctx.arc(w4 + hOffset, h4 * 3 + vOffset, h5, 0, 2 * Math.PI);
                break;
        }
        ctx.stroke();
    } else {
        createError("Canvas context not defined")
    }
}

// draw advance line from HP to given base (1-4)
function drawAdvanceLine(base: number) {
    const ctx = useCanvasStore().ctx
    if (ctx) {
        const hOffset = useCanvasStore().hOffset;
        const vOffset = useCanvasStore().vOffset;

        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        
        ctx.beginPath();
        if (base > 0) {
            ctx.moveTo(w2 + hOffset, h1 - h3 + vOffset);
            ctx.lineTo(w1 - w3 + hOffset, h2 + vOffset);
        }
        if (base > 1) {
            ctx.lineTo(w2 + hOffset, h3 + vOffset);
        }
        if (base > 2) {
            ctx.lineTo(w3 + hOffset, h2 + vOffset);
        }
        if (base > 3) {
            ctx.lineTo(w2 + 2 + hOffset, h1 - h3 + 2 + vOffset);
        }
        ctx.stroke();
    } else {
        createError("Canvas context not defined")
    }
}

// draw narrow connection line between given two bases
// to join two or more consecutive actions
function drawConnector(base1: number, base2: number) {
    if (base1 < 1 || base1 > 3 || base2 < 1 || base2 > 4 || base1 >= base2) {
        alert('Invalid input for consecutive action!');
    } else {
        const ctx = useCanvasStore().ctx
        if (ctx) {
            const hOffset = useCanvasStore().hOffset;
            const vOffset = useCanvasStore().vOffset;

            ctx.lineWidth = 5;
            ctx.strokeStyle = 'black';
            
            let gap = 13;
            let length = 35;
            let arc = 20;
            
            ctx.beginPath();
            switch (base1) {
                case 1:
                    ctx.moveTo(w1 - gap + hOffset, h2 + length + vOffset);
                    ctx.lineTo(w1 - gap + hOffset, h2 - length + vOffset);
                    if (base2 > 2) {
                        ctx.lineTo(w1 - gap + hOffset, gap + vOffset + arc);
                        ctx.moveTo(w1 - gap + hOffset - arc, gap + vOffset);
                        ctx.lineTo(w2 - length + hOffset, gap + vOffset);
                        ctx.arc(w1 - gap + hOffset - arc, gap + vOffset + arc, arc, 1.5*Math.PI, 0);
                    }
                    if (base2 > 3) {
                        ctx.moveTo(w2 - length + hOffset, gap + vOffset);
                        ctx.lineTo(gap + hOffset + arc, gap + vOffset);
                        ctx.moveTo(gap + hOffset, gap + vOffset + arc);
                        ctx.lineTo(gap + hOffset, h2 + length - 10 + vOffset);
                        ctx.arc(gap + hOffset + arc, gap + vOffset + arc, arc, Math.PI, 1.5*Math.PI);
                    }
                    break;
                case 2:
                    ctx.moveTo(w2 + length + hOffset, gap + vOffset);
                    ctx.lineTo(w2 - length + hOffset, gap + vOffset);
                    if (base2 > 3) {
                        ctx.moveTo(w2 - length + hOffset, gap + vOffset);
                        ctx.lineTo(gap + hOffset + arc, gap + vOffset);
                        ctx.moveTo(gap + hOffset, gap + vOffset + arc);
                        ctx.lineTo(gap + hOffset, h2 + length - 10 + vOffset);
                        ctx.arc(gap + hOffset + arc, gap + vOffset + arc, arc, Math.PI, 1.5*Math.PI);
                    }
                    break;
                case 3:
                    ctx.moveTo(gap + hOffset, h2 - length + vOffset);
                    ctx.lineTo(gap + hOffset, h2 + length - 10 + vOffset);
                    break;
            }
            ctx.stroke();
        } else {
            createError("Canvas context not defined")
        }
    }
}

// draw hit symbol at specified base (1-3)
function drawHitSymbol(base: number) {
    const ctx = useCanvasStore().ctx
    if (ctx) {
        const hOffset = useCanvasStore().hOffset;
        const vOffset = useCanvasStore().vOffset;

        ctx.lineWidth = 6;

        ctx.beginPath();
        switch (base) {
            case 1:
                ctx.moveTo(w2 + 25 + hOffset, h1 - 35 + vOffset);
                ctx.lineTo(w2 + 50 + hOffset, h2 + 25 + vOffset);
                ctx.moveTo(w2 + 30 + hOffset, h2 + 40 + vOffset);
                ctx.lineTo(w2 + 58 + hOffset, h2 + 45 + vOffset);
                break;
            case 2:
                ctx.moveTo(w2 + 25 + hOffset, h2 - 35 + vOffset);
                ctx.lineTo(w2 + 50 + hOffset, 25 + vOffset);
                ctx.moveTo(w2 + 30 + hOffset, 35 + vOffset);
                ctx.lineTo(w2 + 58 + hOffset, 40 + vOffset);
                ctx.moveTo(w2 + 28 + hOffset, 45 + vOffset);
                ctx.lineTo(w2 + 56 + hOffset, 50 + vOffset);
                break;
            case 3:
                ctx.moveTo(20 + hOffset, h2 - 35 + vOffset);
                ctx.lineTo(45 + hOffset, 25 + vOffset);
                ctx.moveTo(25 + hOffset, 35 + vOffset);
                ctx.lineTo(53 + hOffset, 40 + vOffset);
                ctx.moveTo(23 + hOffset, 45 + vOffset);
                ctx.lineTo(51 + hOffset, 50 + vOffset);
                ctx.moveTo(21 + hOffset, 55 + vOffset);
                ctx.lineTo(49 + hOffset, 60 + vOffset);
                break;
        }
        ctx.stroke();
    } else {
        createError("Canvas context not defined")
    }
}

// draw the actual output of selected action
function writeSituation(output: WBSCOutput) {
    const out = output.out;
    const hit = output.hit;
    const sub = output.sub;
    const sup = output.sup;
    const na = output.na;

    let text1 = output.text1;
    let text2 = output.text2;
    
    const ctx = useCanvasStore().ctx
    if (ctx) {
        
        const hOffset = useCanvasStore().hOffset;
        const vOffset = useCanvasStore().vOffset;
    
        if (text1 === '*') {
            ctx.fillStyle = 'red';
        } else {
            ctx.fillStyle = 'black';
        }
        
        ctx.font = 'bold 45px Verdana';

        let offset = 20;
        let hitOffset = 0;
        let locHOffset = 0;
        let row1font = '';
        let row1offset = 0;
        let row2font = '';
        let row2offset = 0;
        
        let base = output.base;
        switch (base) {
            case 0:
                if (na) {
                    ctx.font = 'bold 20px Verdana';
                    ctx.fillText(text1, w2 * 1.5 + 18 + hOffset, h2 * 1.5 + 50 + vOffset);
                } else {
                    if (text2 !== null && text2 !== undefined) {
                        if (text1.length > 2) {
                            ctx.font = 'bold 75px Verdana';
                            offset = -4;
                        } else {
                            ctx.font = 'bold 90px Verdana';
                            offset = -8;
                        }
                        ctx.fillText(text1, w2 + hOffset, h2 + offset + vOffset);
                    
                        if (text2.length > 3) {
                            ctx.font = 'bold 60px Verdana';
                            offset = 60;
                        } else if (text2.length > 2 || text1.length > 2) {
                            ctx.font = 'bold 75px Verdana';
                            offset = 65;
                        } else {
                            ctx.font = 'bold 90px Verdana';
                            offset = 75;
                        }
                        ctx.fillText(text2, w2 + hOffset, h2 + offset + vOffset);    
                    } else {
                        if (text1.length > 5) {
                            ctx.font = 'bold 45px Verdana';
                            offset = 16;
                        } else if (text1.length > 4) {
                            ctx.font = 'bold 52px Verdana';
                            offset = 20;
                        } else if (text1.length > 3) {
                            ctx.font = 'bold 68px Verdana';
                            offset = 26;
                        } else if (text1.length > 2) {
                            ctx.font = 'bold 90px Verdana';
                            offset = 34;
                        } else {
                            ctx.font = 'bold 110px Verdana';
                            offset = 42
                        }
                        ctx.fillText(text1, w2 + hOffset, h2 + offset + vOffset);
                    }
                }
                if (sub !== null && sub !== undefined) {
                    ctx.font = 'bold 40px Verdana';
                    ctx.fillText(sub, w1 + hOffset - 30, h1 - 20 + vOffset);
                }
                if (sup !== null && sup !== undefined) {
                    if (sup === '14') {
                        ctx.font = 'bold 28px Verdana';
                        ctx.fillText(sup, w1 + hOffset - 32, 38 + vOffset);
                    } else {
                        ctx.font = 'bold 40px Verdana';
                        ctx.fillText(sup, w1 + hOffset - 30, 42 + vOffset);
                    }
                }
                break;
            case 1:
                if (na) {
                    if (text2 !== null && text2 !== undefined) {
                        text1 += text2;
                    }
                    ctx.font = '26px Verdana';
                    locHOffset = (text1.length - 3) * 6;
                    ctx.fillStyle = '#303030';
                    ctx.fillText(text1, w2 * 1.5 + 20 - locHOffset + hOffset, h2 + 24 + vOffset);
                } else {
                    if (hit) {
                        drawHitSymbol(1);
                        hitOffset = 15;
                    } else {
                        hitOffset = -2;
                    }
                    if (text2 !== null && text2 !== undefined) {
                    
                        if (text1.length > 2) {
                            ctx.font = 'bold 36px Verdana';
                            offset = 0;
                        } else {
                            offset = -5;
                        }
                        ctx.fillText(text1, w2 * 1.5 + hOffset, h2 * 1.5 + offset + vOffset);
                        
                        if (text2.length > 4) {
                            ctx.font = 'bold 28px Verdana';
                            offset = 36;
                        } else if (text2.length > 3) {
                            ctx.font = 'bold 36px Verdana';
                            offset = 38;
                        } else {
                            offset = 40;
                        }
                        ctx.fillText(text2, w2 * 1.5 + hOffset, h2 * 1.5 + offset + vOffset);
                    } else {
                        if (text1.length > 5) {
                            ctx.font = 'bold 24px Verdana';
                            offset = 12;
                        } else if (text1.length > 4) {
                            ctx.font = 'bold 30px Verdana';
                            offset = 16;
                        } else if (text1.length > 3 || (hit && text1.length > 1) || text1 === 'IBB') {
                            ctx.font = 'bold 38px Verdana';
                            offset = 18;
                        }
                        ctx.fillText(text1, w2 * 1.5 + hOffset + hitOffset, h2 * 1.5 + offset + vOffset);
                    }
                    if (sub !== null && sub !== undefined) {
                        ctx.font = 'bold 30px Verdana';
                        if (text1.startsWith('K')) {
                            ctx.fillText(sub, w1 + hOffset - 20, h1 - 62 + vOffset);
                        } else {
                            ctx.fillText(sub, w1 + hOffset - 18, h1 - 33 + vOffset);
                        }
                    }
                }
                break;
            case 2:
                if (na) {
                    if (text2 !== null && text2 !== undefined) {
                        text1 += text2;
                    }
                    ctx.font = '26px Verdana';
                    ctx.fillStyle = '#303030';
                    ctx.fillText(text1, w2 + hOffset, offset + 10 + vOffset);
                } else {
                    if (hit) {
                        drawHitSymbol(2);
                        hitOffset = 20;
                    } else {
                        hitOffset = 0;
                    }
                    if (out) {
                        if (text2 !== null && text2 !== undefined) {
                            row1font = 'bold 56px Verdana';
                            row2font = 'bold 56px Verdana';
                            row1offset = 45;
                            row2offset = 6;
                            if (text1.length > 2) {
                                row1font = 'bold 45px Verdana';
                            }
                            if (text2.length > 3) {
                                row1offset = 35;
                                row2offset = 2;
                                row2font = 'bold 28px Verdana';
                            } else if (text2.length > 2) {
                                row1offset = 40;
                                row2offset = 4;
                                row2font = 'bold 36px Verdana';
                            }
                            ctx.font = row1font;
                            ctx.fillText(text1, w2 * 0.7 + hOffset, h2 - row1offset + vOffset);
                            ctx.font = row2font;
                            ctx.fillText(text2, w2 * 0.7 + hOffset, h2 + row2offset + vOffset);
                        } else {
                            if (text1.length > 4) {
                                ctx.font = 'bold 32px Verdana';
                                offset = 26;
                            } else if (text1.length > 3) {
                                ctx.font = 'bold 42px Verdana';
                                offset = 23;
                            } else if (text1.length > 2) {
                                ctx.font = 'bold 52px Verdana';
                                offset = 20;
                            } else {
                                ctx.font = 'bold 60px Verdana';
                                offset = 17;
                            }
                            ctx.fillText(text1, w2 * 0.7 + hOffset, h2 - offset + vOffset);
                        }
                        // if batter indicator should be displayed, put it into top-left corner
                        base = 3;
                    } else {
                        if (text2 !== null && text2 !== undefined) {
                            row1font = 'bold 40px Verdana';
                            row1offset = 8;
                            row2font = 'bold 40px Verdana';
                            row2offset = 30;
                            if (text2.length > 4) {
                                row1offset = 3;
                                row2offset = 26;
                                row2font = 'bold 24px Verdana';
                            } else if (text2.length > 3) {
                                row1offset = 5;
                                row2offset = 28;
                                row2font = 'bold 30px Verdana';
                            }
                            ctx.font = row1font;
                            ctx.fillText(text1, w2 * 1.5 + hOffset + hitOffset, h2 * 0.5 - row1offset + vOffset);
                            ctx.font = row2font;
                            ctx.fillText(text2, w2 * 1.5 + hOffset + hitOffset, h2 * 0.5 + row2offset + vOffset);
                        } else {
                            if (text1.length > 4) {
                                ctx.font = 'bold 24px Verdana';
                                offset = 10;
                            } else if (text1.length > 3) {
                                ctx.font = 'bold 30px Verdana';
                                offset = 12;
                            } else if (text1.length > 2) {
                                ctx.font = 'bold 38px Verdana';
                                offset = 14;
                            } else {
                                ctx.font = 'bold 45px Verdana';
                                offset = 18;
                            }
                            ctx.fillText(text1, w2 * 1.5 + hOffset + hitOffset, h2 * 0.5 + offset + vOffset);
                        }
                    }
                    if (sup !== null && sup !== undefined) {
                        ctx.font = 'bold 28px Verdana';
                        ctx.fillText(sup, w2 * 2 - 15, 35 + vOffset);
                    }
                }
                break;
            case 3:
                if (na) {
                    if (text2 !== null && text2 !== undefined) {
                        text1 += text2;
                    }
                    ctx.font = '26px Verdana';
                    locHOffset = (text1.length - 3) * 6;
                    ctx.fillStyle = '#303030';
                    ctx.fillText(text1, w2 * 0.5 - 20 + locHOffset + hOffset, h2 - 8 + vOffset);
                } else {
                    if (hit) {
                        drawHitSymbol(3);
                        hitOffset = 20;
                    } else {
                        hitOffset = 0;
                    }
                    if (out) {
                        if (text2 !== null && text2 !== undefined) {
                            row1font = 'bold 40px Verdana';
                            row2font = 'bold 40px Verdana';
                            row1offset = 5;
                            row2offset = 35;
                            if (text1.length > 2) {
                                row1font = 'bold 34px Verdana';
                            }
                            if (text2.length > 3) {
                                row1offset = 4;
                                row2offset = 26;
                                row2font = 'bold 28px Verdana';
                            } else if (text2.length > 2) {
                                row1offset = 3;
                                row2offset = 28;
                                row2font = 'bold 34px Verdana';
                            }
                            ctx.font = row1font;
                            ctx.fillText(text1, w2 * 0.5 + hOffset, h2 - row1offset + vOffset);
                            ctx.font = row2font;
                            ctx.fillText(text2, w2 * 0.5 + hOffset, h2 + row2offset + vOffset);
                        } else {
                            if (text1.length > 4) {
                                ctx.font = 'bold 24px Verdana';
                                offset = 10;
                            } else if (text1.length > 3) {
                                ctx.font = 'bold 30px Verdana';
                                offset = 12;
                            } else if (text1.length > 2) {
                                ctx.font = 'bold 38px Verdana';
                                offset = 14;
                            } else {
                                ctx.font = 'bold 45px Verdana';
                                offset = 18;
                            }
                            ctx.fillText(text1, w2 * 0.5 + hOffset, h2 + offset + vOffset);
                        }
                    } else {
                        if (text2 !== null && text2 !== undefined) {
                            row1font = 'bold 40px Verdana';
                            row1offset = 8;
                            row2font = 'bold 40px Verdana';
                            row2offset = 30;
                            if (text2.length > 4) {
                                row1offset = 3;
                                row2offset = 26;
                                row2font = 'bold 24px Verdana';
                            } else if (text2.length > 3) {
                                row1offset = 5;
                                row2offset = 28;
                                row2font = 'bold 30px Verdana';
                            }
                            ctx.font = row1font;
                            ctx.fillText(text1, w2 * 0.5 + hOffset, h2 * 0.5 - row1offset + vOffset);
                            ctx.font = row2font;
                            ctx.fillText(text2, w2 * 0.5 + hOffset, h2 * 0.5 + row2offset + vOffset);
                        } else {
                            if (text1.length > 4) {
                                ctx.font = 'bold 24px Verdana';
                                offset = 10;
                            } else if (text1.length > 3) {
                                ctx.font = 'bold 30px Verdana';
                                offset = 12;
                            } else if (text1.length > 2) {
                                ctx.font = 'bold 38px Verdana';
                                offset = 14;
                            } else {
                                ctx.font = 'bold 45px Verdana';
                                offset = 18;
                            }
                            ctx.fillText(text1, w2 * 0.5 + hOffset + hitOffset, h2 * 0.5 + offset + vOffset);
                        }
                    }
                    if (sup !== null && sup !== undefined) {
                        ctx.font = 'bold 28px Verdana';
                        ctx.fillText(sup, w2 * 1.5 - 5, h2 * 0.5 + 12 + vOffset);
                    }
                }
                break;
            case 4:
                if (text2 !== null && text2 !== undefined) {
                    if (out && text1.length > 2) {
                        ctx.font = 'bold 28px Verdana';
                    } else {
                        ctx.font = 'bold 32px Verdana';
                    }
                    offset = 32;
                    ctx.fillText(text1, w2 * 0.5 + hOffset, h2 * 1.5 + vOffset);
                    if (text2.length > 3) {
                        ctx.font = 'bold 25px Verdana';
                    }
                    ctx.fillText(text2, w2 * 0.5 + hOffset, h2 * 1.5 + offset + vOffset);
                } else {
                    if (text1.length > 4) {
                        ctx.font = 'bold 24px Verdana';
                        offset = 10;
                    } else if (text1.length > 3) {
                        ctx.font = 'bold 30px Verdana';
                        offset = 12;
                    } else if (text1.length > 2) {
                        ctx.font = 'bold 38px Verdana';
                        offset = 14;
                    } else {
                        ctx.font = 'bold 45px Verdana';
                        offset = 18;
                    }
                    ctx.fillText(text1, w2 * 0.5 + hOffset, h2 * 1.5 + offset + vOffset);
                }
                if (sup !== null && sup !== undefined) {
                    ctx.font = 'bold 28px Verdana';
                    ctx.fillText(sup, w2 * 1.5 + 2, h2 + 20 + vOffset);
                }

                if (output.out === false) {
                    const runType = output.run;
                    switch (runType) {
                        case 'e':
                            // the diamond is filled
                            ctx.beginPath();
                            ctx.moveTo(w2 + hOffset, h1 - h3 + vOffset);
                            ctx.lineTo(w1 - w3 + hOffset, h2 + vOffset);
                            ctx.lineTo(w2 + hOffset, h3 + vOffset);
                            ctx.lineTo(w3 + hOffset, h2 + vOffset);
                            ctx.lineTo(w2 + 3 + hOffset, h1 - h3 + 3 + vOffset);
                            ctx.closePath();
                            ctx.fill();
                            break;
                        case 'tu':
                            // the diamond is crossed
                            ctx.beginPath();
                            ctx.moveTo(w2 + hOffset, h1 - h3 + vOffset);
                            ctx.lineTo(w2 + hOffset, h3 + vOffset);
                            ctx.moveTo(w1 - w3 + hOffset, h2 + vOffset);
                            ctx.lineTo(w3 + hOffset, h2 + vOffset);
                            ctx.stroke();
                            break;
                        case 'ue':
                            // leave the diamond empty
                            break;
                    }
                }
                break;
        }

        if (output.num) {
            writeBatterIndicator(base);
        }
    } else {
        createError("Canvas context not defined")
    }
}

// small boxed number in corner to indicate batting order 
// at the moment the action occured
function writeBatterIndicator(base: number) {
    const hOffset = useCanvasStore().hOffset;
    const vOffset = useCanvasStore().vOffset;
    let coords = [];
    switch (base) {
        case 1:
            coords.push({x: w1 + hOffset - 16, y: h2 -  4 + vOffset});
            coords.push({x: w1 + hOffset - 26, y: h2 -  2 + vOffset});
            coords.push({x: w1 + hOffset - 26, y: h2 - 22 + vOffset});
            coords.push({x: w1 + hOffset -  8, y: h2 - 22 + vOffset});
            break;
        case 2:
            coords.push({x: w1 + hOffset - 16, y: 26 + vOffset});
            coords.push({x: w1 + hOffset - 26, y:  8 + vOffset});
            coords.push({x: w1 + hOffset - 26, y: 31 + vOffset});
            coords.push({x: w1 + hOffset -  8, y: 31 + vOffset});
            break;
        case 3:
            coords.push({x: hOffset + 15, y: 26 + vOffset});
            coords.push({x: hOffset + 26, y:  8 + vOffset});
            coords.push({x: hOffset + 26, y: 31 + vOffset});
            coords.push({x: hOffset +  8, y: 31 + vOffset});
            break;
        case 4:
            coords.push({x: hOffset + 15, y: h2 + 20 + vOffset});
            coords.push({x: hOffset + 26, y: h2 +  2 + vOffset});
            coords.push({x: hOffset + 26, y: h2 + 25 + vOffset});
            coords.push({x: hOffset +  8, y: h2 + 25 + vOffset});
            break;
    }

    const ctx = useCanvasStore().ctx
    if (ctx) {
        ctx.font = 'bold 20px Verdana';
        ctx.fillText(useEvalStore().batter.toString(), coords[0].x, coords[0].y);

        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(coords[1].x, coords[1].y);
        ctx.lineTo(coords[2].x, coords[2].y);
        ctx.lineTo(coords[3].x, coords[3].y);
        ctx.stroke();
    } else {
        createError("Canvas context not defined")
    }
}

// processed AFTER all sitations were rendered
// if plays result into more than one out
// out circles has to be connected together to mark down double (triple) play
function connectOutsIfNeeded() {
    if (useEvalStore().outs.length > 1) {
        for (let i = 0; i < useEvalStore().outs.length - 1; i += 1) {
            let start = useEvalStore().outs[i];
            let end = useEvalStore().outs[i + 1];

            const hOffset = useCanvasStore().hOffset;
            const lineHOffset = 20;
            const vOffsetStart = (h1 - 8) * (start.batter - 1);
            const vOffsetEnd = (h1 - 8) * (end.batter - 1);

            let startX = 0;
            let startY = 0;
            let endX = 0;
            let endY = 0;
            switch (start.base) {
                case 4:
                    startX = hOffset + lineHOffset;
                    startY = h1 - 36 + vOffsetStart;
                    switch (end.base) {
                        case 3:
                            startX = hOffset + h2/2;
                            startY = h1 - 15 + vOffsetStart;
                            endX = hOffset + h2/2;
                            endY = h2 - 47 + vOffsetEnd;
                            break;
                        case 2:
                            startX += 15;
                            startY += 15;
                            endX = hOffset + lineHOffset + 15;
                            endY = 37 + vOffsetEnd;
                            break;
                        case 0:
                            endX = hOffset + lineHOffset;
                            endY = h2 - 30 + vOffsetEnd;
                            break;
                    }
                    break;
                case 3:
                    startX = hOffset + lineHOffset;
                    startY = h2 + 25 + vOffsetStart;
                    if (end.base === 2) {
                        endX = hOffset + lineHOffset;
                        endY = h2 / 2 + vOffsetEnd;
                    } else {
                        endX = hOffset + lineHOffset;
                        endY = h2 - 30 + vOffsetEnd;
                    }
                    break;
                case 2:
                    startX = hOffset + lineHOffset;
                    startY = h2 - 13 + vOffsetStart;
                    endX = hOffset + lineHOffset;
                    endY = h2 - 30 + vOffsetEnd;
                    break;
            }

            const ctx = useCanvasStore().ctx
            if (ctx) {
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            } else {
                createError("Canvas context not defined")
            }
        }
    }
}

// processed AFTER all sitations were rendered
// if play contains 2 or more actions that has to be marked as "concurrent"
// (e.g. KS+SB, BB+WP or SB+SB)
// we need to link them with double-sided arrow connector
function connectConcurrentPlaysIfNeeded() {
    if (useEvalStore().concurrentPlays.length > 1) {
        for (let i = 0; i < useEvalStore().concurrentPlays.length - 1; i += 1) {
            let start = useEvalStore().concurrentPlays[i];
            let end = useEvalStore().concurrentPlays[i + 1];

            // two outs are already connected
            if (start.out === false || end.out === false) {
                const hOffset = useCanvasStore().hOffset;
                const lineHOffset = 30;
                const vOffsetStart = (h1 - 8) * (start.batter - 1);
                const vOffsetEnd = (h1 - 8) * (end.batter - 1);
                const out = start.out === true;

                const startNa = start.na === true;
                const endNa = end.na === true;

                let startX = 0;
                let startY = 0;
                let endX = 0;
                let endY = 0;
                switch (start.base) {
                    case 4:
                        startY = h1 - 20 + vOffsetStart;
                        switch (end.base) {
                            case 3:
                                if (out) {
                                    startX = hOffset + (h2 - lineHOffset);
                                    endX = hOffset + (h2 - lineHOffset);
                                    endY = 25 + vOffsetEnd;
                                } else {
                                    startX = hOffset + h2/2;
                                    endX = hOffset + h2/2;
                                    if (end.out === true) {
                                        endY = h2/2 + vOffsetEnd;
                                    } else {
                                        endY = 25 + vOffsetEnd;
                                    }
                                }
                                break;
                            case 2:
                                startX = hOffset + (h2 - lineHOffset);
                                endX = hOffset + h2 + lineHOffset;
                                endY = 25 + vOffsetEnd;
                                break;
                            case 1:
                                startX = hOffset + (h2 - lineHOffset);
                                if (out) {
                                    startY += 15;
                                }
                                endX = hOffset + h2 + lineHOffset;
                                endY = h2 + 25 + vOffsetEnd;
                                break;
                            case 0:
                                startX = hOffset + lineHOffset;
                                endX = hOffset + lineHOffset;
                                endY = 25 + vOffsetEnd;
                                break;
                        }
                        break;
                    case 3:
                        let xHOffset = 0;
                        if (out) {
                            startY = h2 * 1.5 + vOffsetStart;
                            xHOffset = h2/4;
                        } else {
                            startY = h2 - (startNa ? -5 : 25) + vOffsetStart;
                        }
                        switch (end.base) {
                            case 2:
                                startX = hOffset + h2/2 + xHOffset;
                                endX = hOffset + h2 + (endNa ? 0 : lineHOffset);
                                endY = (endNa ? 0 : 25) + vOffsetEnd;
                                break;
                            case 1:
                                startX = hOffset + h2/2 + xHOffset;
                                endX = hOffset + h2 +  (endNa ? h2/2 : lineHOffset);
                                endY = h2 + (endNa ? -5 : 25) + vOffsetEnd;
                                break;
                            case 0:
                                startX = hOffset + lineHOffset;
                                endX = hOffset + lineHOffset;
                                endY = 25 + vOffsetEnd;
                                break;
                        }
                        break;
                    case 2:
                        if (out) {
                            startX = hOffset + (h2 - lineHOffset);
                            startY = h2 + 45 + vOffsetStart;
                        } else {
                            if (startNa) {
                                startX = hOffset + h2;
                                startY = 45 + vOffsetStart;
                            } else {
                                startX = hOffset + (h1 - lineHOffset);
                                startY = h2 - 25 + vOffsetStart;
                            }
                        }
                        switch (end.base) {
                            case 1:
                                if (out) {
                                    endX = hOffset + h2 + lineHOffset;
                                    endY = h2 + 25 + vOffsetEnd;
                                } else {
                                    if (startNa) {
                                        endX = hOffset + (h1 - h2/2);
                                        endY = h2 + (endNa ? -5 : 15) + vOffsetEnd;
                                    } else {
                                        endX = hOffset + (h1 - (endNa ? h2/2 : lineHOffset));
                                        endY = h2 + (endNa ? -5 : 25) + vOffsetEnd;
                                    }
                                }
                                break;
                            case 0:
                                endX = hOffset + (h1 - lineHOffset);
                                endY = 25 + vOffsetEnd;
                                break;
                        }
                        break;
                }
                
                drawArrow(startX, startY, endX, endY);
                drawArrow(endX, endY, startX, startY);
            }
        }
    }
}

// helper function to render an arrow
// from http://masf-html5.blogspot.com/2016/04/path-drawing-mode-lines-circles-arcs.html
function drawArrow(fromx: number, fromy: number, tox: number, toy: number) {

    const headlen = 10;
    const angle = Math.atan2(toy-fromy,tox-fromx);
 
    const ctx = useCanvasStore().ctx
    if (ctx) {
        ctx.lineWidth = 6;

        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
                toy-headlen*Math.sin(angle-Math.PI/7));
        ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),
                toy-headlen*Math.sin(angle+Math.PI/7));
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
                toy-headlen*Math.sin(angle-Math.PI/7));
        ctx.stroke(); 
    } else {
        createError("Canvas context not defined")
    }
}

// if there is multiple error advance,
// the "E" mark is made to first base reached on error
// and the extra advance is visualized with an arrow
function drawExtraErrorAdvanceIfNeeded(origBase: number, targetBase: number) {
    if (targetBase > origBase) {
        
        const ctx = useCanvasStore().ctx
        if (ctx) {
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'black';
        } else {
            createError("Canvas context not defined")
        }
        
        switch (origBase) {
            case 1:
                drawExtraErrorAdvanceTo2B(targetBase == 2) 
                if (targetBase > 2) {
                    drawExtraErrorAdvanceTo3B(false, targetBase == 3) 
                }
                if (targetBase > 3) {
                    drawExtraErrorAdvanceToHP(false) 
                }
                break;
            case 2:
                drawExtraErrorAdvanceTo3B(true, targetBase == 3) 
                if (targetBase > 3) {
                    drawExtraErrorAdvanceToHP(false) 
                }
                break;
            case 3:
                drawExtraErrorAdvanceToHP(true) 
                break;
        }
    }
}

function drawExtraErrorAdvanceTo2B(endsAt2B: boolean) {
    const gap = w2/2;
    const length = 35;
    const arc = 30;

    const ctx = useCanvasStore().ctx
    if (ctx) {
        const hOffset = useCanvasStore().hOffset;
        const vOffset = useCanvasStore().vOffset;

        ctx.beginPath();
        ctx.moveTo(w1 - gap + hOffset, h2 + length + vOffset);
        ctx.lineTo(w1 - gap + hOffset, h2 - length + vOffset);
        ctx.stroke();

        if (endsAt2B) {
            drawArrow(w1 - gap + hOffset, h2 - length + vOffset, w1 - gap + hOffset, h2 - length - 20 + vOffset);
        } else {
            ctx.beginPath();
            ctx.arc(w1 - gap + hOffset - arc, gap + vOffset + arc, arc, 1.5*Math.PI, 0);
            ctx.stroke();
        }
    } else {
        createError("Canvas context not defined")
    }
}

function drawExtraErrorAdvanceTo3B(startsAt2B: boolean, endsAt3B: boolean) {
    const gap = w2/2;
    const length = 35;
    const arc = 30;
    const shift = startsAt2B ? 10 : 0;

    const ctx = useCanvasStore().ctx
    if (ctx) {
        const hOffset = useCanvasStore().hOffset;
        const vOffset = useCanvasStore().vOffset;

        ctx.beginPath();
        ctx.moveTo(w2 + length + hOffset - shift, gap + vOffset);
        ctx.lineTo(w2 - length + hOffset, gap + vOffset);
        ctx.stroke();

        if (endsAt3B) {
            drawArrow(w2 - length + hOffset, gap + vOffset, w2 - length - 20 + hOffset, gap + vOffset);
        } else {
            ctx.beginPath();
            ctx.arc(gap + hOffset + arc, gap + vOffset + arc, arc, Math.PI, 1.5*Math.PI);
            ctx.stroke();
        }
    } else {
        createError("Canvas context not defined")
    }
}

function drawExtraErrorAdvanceToHP(startsAt3B: boolean) {
    const gap = w2/2;
    const length = 35;
    const shift = startsAt3B ? 10 : 0;

    const ctx = useCanvasStore().ctx
    if (ctx) {
        const hOffset = useCanvasStore().hOffset;
        const vOffset = useCanvasStore().vOffset;

        ctx.beginPath();
        ctx.moveTo(gap + hOffset, h2 - length + shift + vOffset);
        ctx.lineTo(gap + hOffset, h2 + length);
        ctx.stroke();
        
        drawArrow(gap + hOffset, h2 + length, gap + hOffset,  h2 + length + 20);
    } else {
        createError("Canvas context not defined")
    }
}

export {
    drawBackground, renderAction, connectOutsIfNeeded, connectConcurrentPlaysIfNeeded
}