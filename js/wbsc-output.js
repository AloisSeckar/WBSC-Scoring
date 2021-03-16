/* *************************************** */
/* wbsc-output.js                          */
/* Final rendering based on user's input   */
/* *************************************** */

// rendering the output
//   battingOrder - number displayed at the left side (1-4)
//   mainInput - 1st action to be displayed
//   extraInput - possible concecutive actions (0-3)
//   clear - true, if previous content should be ereased
function renderAction(battingOrder, mainInput, extraInput, clear) {
    if (clear) {
        drawBackground(battingOrder);
    }
    
    if (mainInput[input_origBase] !== null) {
        let prevOutput = [];
        prevOutput[output_base] = mainInput[input_origBase];
        if (mainInput[input_tie] === true) {
            prevOutput[output_text_1] = 'TIE';
        } else {
            prevOutput[output_text_1] = '*';
        }
        renderAdvance(prevOutput);
    }
    
    const output = processInput(mainInput);
    if (output[output_out] === true) {
        renderOut(output);
    } else {
        renderAdvance(output);
        
        if (extraInput !== null) {
            for (i = 0; i < extraInput.length; i += 1) {
                renderAction(battingOrder, extraInput[i], null, false);
                drawConnector(parseInt(mainInput[input_base]), parseInt(extraInput[i][input_base]));
            }
        }
    }
}

// process 'safe' situation
function renderAdvance(output) {
    drawAdvanceLine(output[output_base]);
    writeSituation(output);
}

// process 'out' situation
function renderOut(output) {
    if (output[output_text_1] !== 'LT') {
        drawOutCircle(output[output_base]);
    }
    writeSituation(output);
}

// prepare empty scoresheet element (blue square)
//   battingOrder - number displayed at the left side (1-4)
function drawBackground(battingOrder) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0 + vOffset, w + hOffset, h);
    
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#00a7d7';
    
    ctx.strokeRect(4, 4 + vOffset, hOffset, h - 8);
    
    ctx.font = 'bold 60px Verdana';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#00a7d7';
    ctx.fillText(battingOrder, 40,  h2 + 25 + vOffset);
    
    ctx.strokeRect(4 + hOffset, 4 + vOffset, w - 8, h - 8);
    
    ctx.lineWidth = 4;
    
    ctx.beginPath();
    ctx.moveTo(w2 + hOffset, 0 + vOffset);
    ctx.lineTo(w2 + hOffset, h3 + vOffset);
    ctx.stroke();
    ctx.moveTo(w2 + hOffset, h + vOffset);
    ctx.lineTo(w2 + hOffset, h - h3 + vOffset);
    ctx.stroke();
    ctx.moveTo(0 + hOffset, h2 + vOffset);
    ctx.lineTo(w3 + hOffset, h2 + vOffset);
    ctx.stroke();
    ctx.moveTo(w + hOffset, h2 + vOffset);
    ctx.lineTo(w - h3 + hOffset, h2 + vOffset);
    ctx.stroke();
}

// draw circle at given base (0-4)
function drawOutCircle(base) {
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
}

// draw advance line from HP to given base (1-4)
function drawAdvanceLine(base) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    
    ctx.beginPath();
    if (base > 0) {
        ctx.moveTo(w2 + hOffset, h - h3 + vOffset);
        ctx.lineTo(w - w3 + hOffset, h2 + vOffset);
    }
    if (base > 1) {
        ctx.lineTo(w2 + hOffset, h3 + vOffset);
    }
    if (base > 2) {
        ctx.lineTo(w3 + hOffset, h2 + vOffset);
    }
    if (base > 3) {
        ctx.lineTo(w2 + 2 + hOffset, h - h3 + 2 + vOffset);
    }
    ctx.stroke();
}

// draw narrow connection line between given two bases
// to join two or more consecutive actions
function drawConnector(base1, base2) {
    if (base1 < 1 || base1 > 3 || base2 < 1 || base2 > 4 || base1 >= base2) {
        alert('Invalid input for consecutive action!');
    } else {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        
        let gap = 16;
        let length = 35;
        let arc = 20;
        
        ctx.beginPath();
        switch (base1) {
            case 1:
                ctx.moveTo(w - gap + hOffset, h2 + length + vOffset);
                ctx.lineTo(w - gap + hOffset, h2 - length + vOffset);
                if (base2 > 2) {
                    ctx.lineTo(w - gap + hOffset, gap + vOffset + arc);
                    ctx.moveTo(w - gap + hOffset - arc, gap + vOffset);
                    ctx.lineTo(w2 - length + hOffset, gap + vOffset);
                    ctx.arc(w - gap + hOffset - arc, gap + vOffset + arc, arc, 1.5*Math.PI, 0);
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
    }
}

// draw hit symbol at specified base (1-3)
function drawHitSymbol(base) {
    ctx.lineWidth = 6;
    ctx.beginPath();
    switch (base) {
        case 1:
            ctx.moveTo(w2 + 25 + hOffset, h - 35 + vOffset);
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
}

// draw the actual output of selected action
function writeSituation(output) {
    let text1 = output[output_text_1];
    let text2 = output[output_text_2];
    let out = output[output_out];
    let hit = output[output_hit];
    let sub = output[output_sub];
    let sup = output[output_sup];
    let num = output[output_num];
    let na = output[output_na];
    
    if (text1 === '*') {
        ctx.fillStyle = 'red';
    } else {
        ctx.fillStyle = 'black';
    }
    
    ctx.font = 'bold 45px Verdana';
    offset = 20;
    
    switch (output[output_base]) {
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
                ctx.fillText(sub, w + hOffset - 30, h - 20 + vOffset);
            }
            if (sup !== null && sup !== undefined) {
                if (sup === '14') {
                    ctx.font = 'bold 28px Verdana';
                    ctx.fillText(sup, w + hOffset - 32, 38 + vOffset);
                } else {
                    ctx.font = 'bold 40px Verdana';
                    ctx.fillText(sup, w + hOffset - 30, 42 + vOffset);
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
                if (num) {
                    ctx.font = 'bold 20px Verdana';
                    ctx.strokeStyle = '#303030';
                    ctx.fillText(window.batter, w + hOffset - 16, h2 - 4 + vOffset);
                    
                    ctx.lineWidth = 3;
                    ctx.moveTo(w + hOffset - 26, h2 - 2 + vOffset);
                    ctx.lineTo(w + hOffset - 26, h2 - 22 + vOffset);
                    ctx.lineTo(w + hOffset - 8, h2 - 22 + vOffset);
                    ctx.stroke();
                }
            } else {
                if (hit) {
                    drawHitSymbol(1);
                    hitOffset = 15;
                } else {
                    hitOffset = -2;
                }
                if (text2 !== null && text2 !== undefined) {
                    offset = -5;
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
                        ctx.fillText(sub, w + hOffset - 20, h - 62 + vOffset);
                    } else {
                        ctx.fillText(sub, w + hOffset - 18, h - 33 + vOffset);
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
                if (num) {
                    ctx.font = 'bold 20px Verdana';
                    ctx.strokeStyle = '#303030';
                    ctx.fillText(window.batter, w + hOffset - 16, 26 + vOffset);
                    
                    ctx.lineWidth = 3;
                    ctx.moveTo(w + hOffset - 26, 8 + vOffset);
                    ctx.lineTo(w + hOffset - 26, 31 + vOffset);
                    ctx.lineTo(w + hOffset - 8, 31 + vOffset);
                    ctx.stroke();
                }
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
                            ctx.font = 'bold 28px Verdana';
                            offset = 12;
                        } else if (text1.length > 3) {
                            ctx.font = 'bold 35px Verdana';
                            offset = 14;
                        } else {
                            ctx.font = 'bold 40px Verdana';
                            offset = 18;
                        }
                        ctx.fillText(text1, w2 * 1.5 + hOffset + hitOffset, h2 * 0.5 + offset + vOffset);
                    }
                }
                if (sup !== null && sup !== undefined) {
                    ctx.font = 'bold 28px Verdana';
                    ctx.fillText(sup, w2 * 2 - 15, 35 + vOffset);
                }
                if (num) {
                    ctx.font = 'bold 20px Verdana';
                    ctx.fillText(window.batter, w + hOffset - 16, 26 + vOffset);
                    
                    ctx.lineWidth = 3;
                    ctx.moveTo(w + hOffset - 26, 8 + vOffset);
                    ctx.lineTo(w + hOffset - 26, 31 + vOffset);
                    ctx.lineTo(w + hOffset - 8, 31 + vOffset);
                    ctx.stroke();
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
                if (num) {
                    ctx.font = 'bold 20px Verdana';
                    ctx.strokeStyle = '#303030';
                    ctx.fillText(window.batter, hOffset + 15, h2 + 20 + vOffset);
                
                    ctx.lineWidth = 3;
                    ctx.moveTo(hOffset + 26, h2 + 2 + vOffset);
                    ctx.lineTo(hOffset + 26, h2 + 25 + vOffset);
                    ctx.lineTo(hOffset + 8, h2 + 25 + vOffset);
                    ctx.stroke();
                }
            } else {
                if (hit) {
                    drawHitSymbol(2);
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
                        ctx.fillText(text1, w2 * 0.5 + hOffset, h2 - offset + vOffset);
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
                            ctx.font = 'bold 36px Verdana';
                            offset = 14;
                        } else {
                            ctx.font = 'bold 42px Verdana';
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
                        ctx.fillText(text1, w2 * 0.5 + hOffset, h2 * 0.5 - offset + vOffset);
                        ctx.font = row2font;
                        ctx.fillText(text2, w2 * 0.5 + hOffset, h2 * 0.5 + row2offset + vOffset);
                    } else {
                        if (text1.length > 4) {
                            ctx.font = 'bold 28px Verdana';
                            offset = 12;
                        } else if (text1.length > 3) {
                            ctx.font = 'bold 36px Verdana';
                            offset = 14;
                        } else {
                            ctx.font = 'bold 42px Verdana';
                            offset = 18;
                        }
                        ctx.fillText(text1, w2 * 0.5 + hOffset + hitOffset, h2 * 0.5 + offset + vOffset);
                    }
                }
                if (sup !== null && sup !== undefined) {
                    ctx.font = 'bold 28px Verdana';
                    ctx.fillText(sup, w2 * 1.5 - 5, h2 * 0.5 + 12 + vOffset);
                }
                if (num) {
                    ctx.font = 'bold 20px Verdana';
                    ctx.fillText(window.batter, hOffset + 15, 26 + vOffset);
                    
                    ctx.lineWidth = 3;
                    ctx.moveTo(hOffset + 26, 8 + vOffset);
                    ctx.lineTo(hOffset + 26, 31 + vOffset);
                    ctx.lineTo(hOffset + 8, 31 + vOffset);
                    ctx.stroke();
                }
            }
            break;
        case 4:
            if (text2 !== null && text2 !== undefined) {
                ctx.font = 'bold 32px Verdana';
                offset = 32;
                ctx.fillText(text1, w2 * 0.5 + hOffset, h2 * 1.5 + vOffset);
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
                    ctx.font = 'bold 48px Verdana';
                    offset = 18;
                }
                ctx.fillText(text1, w2 * 0.5 + hOffset, h2 * 1.5 + offset + vOffset);
            }
            if (sup !== null && sup !== undefined) {
                ctx.font = 'bold 28px Verdana';
                ctx.fillText(sup, w2 * 1.5 + 2, h2 + 20 + vOffset);
            }
            if (num) {
                ctx.font = 'bold 20px Verdana';
                ctx.fillText(window.batter, hOffset + 15, h2 + 20 + vOffset);
                
                ctx.lineWidth = 3;
                ctx.moveTo(hOffset + 26, h2 + 2 + vOffset);
                ctx.lineTo(hOffset + 26, h2 + 25 + vOffset);
                ctx.lineTo(hOffset + 8, h2 + 25 + vOffset);
                ctx.stroke();
            }

            const runType = output[output_run];
            switch (runType) {
                case 'e':
                    // the diamond is filled
                    ctx.beginPath();
                    ctx.moveTo(w2 + hOffset, h - h3 + vOffset);
                    ctx.lineTo(w - w3 + hOffset, h2 + vOffset);
                    ctx.lineTo(w2 + hOffset, h3 + vOffset);
                    ctx.lineTo(w3 + hOffset, h2 + vOffset);
                    ctx.lineTo(w2 + 3 + hOffset, h - h3 + 3 + vOffset);
                    ctx.closePath();
                    ctx.fill();
                    break;
                case 'tu':
                    // the diamond is crossed
                    ctx.moveTo(w2 + hOffset, h - h3 + vOffset);
                    ctx.lineTo(w2 + hOffset, h3 + vOffset);
                    ctx.moveTo(w - w3 + hOffset, h2 + vOffset);
                    ctx.lineTo(w3 + hOffset, h2 + vOffset);
                    ctx.stroke();
                    break;
                case 'ue':
                    // leave the diamond empty
                    break;
            }
            break;
    }
}