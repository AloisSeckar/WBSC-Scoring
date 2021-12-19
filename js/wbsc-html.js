/* *************************************** */
/* wbsc-html.js                            */
/* Helpers to get html code to be inserted */
/* *************************************** */

// displayed title for given input group
function getLabelForInputGroup(group) {
    let label = '<strong>';
    switch (group) {
        case input_b:
            label += 'Batter';
            break;
        case input_r1:
            label += 'Runner at 1st';
            break;
        case input_r2:
            label += 'Runner at 2nd';
            break;
        case input_r3:
            label += 'Runner at 3rd';
            break;
    }
    label += '</strong>';
    return label;
}

// displayed text for given action button
function getLabelForRenderButton(group, render) {
    let label = '';
    switch (group) {
        case input_generate:
            label = 'Generate action';
            break;
        case input_clear:
            label = 'Clear';
            break;
        default:
            if (render === true) {
                label += '+';
            } else {
                label += '-';
            }
            switch (group) {
                case input_b:
                    label += 'B';
                    break;
                case input_r1:
                    label += 'R1';
                    break;
                case input_r2:
                    label += 'R2';
                    break;
                case input_r3:
                    label += 'R3';
                    break;
            }
    }
    return label;
}

// list of existing player positions / basic field locations
function renderPlayerOptions() {
    const options = [];
    options.push('<option value=""></option>');
    options.push('<option value="1">P</option>');
    options.push('<option value="2">C</option>');
    options.push('<option value="3">1B</option>');
    options.push('<option value="4">2B</option>');
    options.push('<option value="5">3B</option>');
    options.push('<option value="6">SS</option>');
    options.push('<option value="7">LF</option>');
    options.push('<option value="8">CF</option>');
    options.push('<option value="9">RF</option>');
    return options;
}

// list of extra field locations to describe hits
function renderHitLocationOptions() {
    const options = renderPlayerOptions();
    options.push('<option value="LL">LL</option>');
    options.push('<option value="LS">LS</option>');
    options.push('<option value="LC">LC</option>');
    options.push('<option value="MI">MI</option>');
    options.push('<option value="RC">RC</option>');
    options.push('<option value="RS">RS</option>');
    options.push('<option value="RL">RL</option>');
    return options;
}

// list of target bases for fielder's choice
function renderFCLocationOptions() {
    const options = [];
    options.push('<option value="X">2nd</option>');
    options.push('<option value="Y">3rd</option>');
    options.push('<option value="Z">HP</option>');
    return options;
}

// list of available advances
//   base - original base
function renderBaseOptions(base) {
    const options = [];
    if (base < 2) {
        if (base === 1) {
            options.push('<option value="2" selected>2nd</option>');
        } else {
            options.push('<option value="2">2nd</option>');
        }
    }
    if (base < 3) {
        if (base === 2) {
            options.push('<option value="3" selected>3rd</option>');
        } else {
            options.push('<option value="3">3rd</option>');
        }
    }
    if (base === 3) {
        options.push('<option value="4" selected>Home</option>');
    } else {
        options.push('<option value="4">Home</option>');
    }
    return options;
}

// list of possible run types
function renderRunTypeOptions() {
    const options = [];
    options.push('<option value="e">Earned</option>');
    options.push('<option value="ue">Unearned</option>');
    options.push('<option value="tu">Team unearned</option>');
    return options;
}

// list of basic actions for the batter
function renderBatterActionOptions() {
    const options = [];
    options.push('<option value=""></option>');
    options.push('<option value="StrikeOut">Strike out</option>');
    options.push('<option value="GroundOut">Ground out</option>');
    options.push('<option value="FlyOut">Fly out</option>');
    options.push('<option value="Hit">Hit</option>');
    options.push('<option value="Sacrifice">Sacrifice</option>');
    options.push('<option value="FC">Fielder\'s choice</option>');
    options.push('<option value="Error">Error</option>');
    options.push('<option value="Advance">Advance to 1st</option>');
    options.push('<option value="OBR">Out by rule</option>');
    options.push('<option value="Other">Other out</option>');
    return options;
}

// list of basic actions for the running batter
function renderBatterRunnerActionOptions() {
    const options = [];
    options.push('<option value=""></option>');
    options.push('<option value="fdc">Fielder\'s choice</option>');
    options.push('<option value="err">Error</option>');
    options.push('<option value="out">Out</option>');
    options.push('<option value="obr">Out by rule</option>');
    return options;
}

// list of basic actions for the runner
function renderRunnerActionOptions() {
    const options = [];
    options.push('<option value=""></option>');
    options.push('<option value="adv">Advanced by batter</option>');
    options.push('<option value="nadv">No advance</option>');
    options.push('<option value="exb">Extra base</option>');
    options.push('<option value="ste">Steal / CS</option>');
    options.push('<option value="fdc">Fielder\'s choice</option>');
    options.push('<option value="err">Error</option>');
    options.push('<option value="out">Out</option>');
    options.push('<option value="obr">Out by rule</option>');
    return options;
}

// list of specific actions based on selected base action for batter
function renderBatterSpecificActionOptions(action) {
    const options = [];
    switch (action) {
        case 'StrikeOut':
            options.push('<optgroup label="Batter is out">');
            options.push('<option value="KS">Swinging</option>');
            options.push('<option value="KL">Looking</option>');
            options.push('<option value="KSO">Swinging with tag/throw out</option>');
            options.push('<option value="KLO">Looking with tag/throw out</option>');
            options.push('</optgroup>');
            options.push('<optgroup label="Batter is safe">');
            options.push('<option value="KSET">Swinging with throwing error</option>');
            options.push('<option value="KSE">Swinging with fielding error</option>');
            options.push('<option value="KSWP">Swinging with wild pitch</option>');
            options.push('<option value="KSPB">Swinging with passed ball</option>');
            options.push('<option value="KSFC">Swinging with putting out runner</option>');
            options.push('<option value="KLET">Looking with throwing error</option>');
            options.push('<option value="KLE">Looking with fielding error</option>');
            options.push('<option value="KLWP">Looking with wild pitch</option>');
            options.push('<option value="KLPB">Looking with passed ball</option>');
            options.push('<option value="KLFC">Looking with putting out runner</option>');
            options.push('</optgroup>');
            break;
        case 'GroundOut':
            options.push('<optgroup label="Batter is out">');
            options.push('<option value="GO">Ground out</option>');
            options.push('<option value="GOB">Ground out - bunt</option>');
            options.push('</optgroup>');
            break;
        case 'FlyOut':
            options.push('<optgroup label="Batter is out">');
            options.push('<option value="F">Fly out</option>');
            options.push('<option value="P">Pop out</option>');
            options.push('<option value="L">Line out</option>');
            options.push('<option value="FF">Fouled fly out</option>');
            options.push('<option value="FP">Fouled pop out</option>');
            options.push('<option value="FL">Fouled line out</option>');
            options.push('<option value="IF">Infield fly</option>');
            options.push('<option value="FB">Fly out - bunt</option>');
            options.push('<option value="FFB">Fouled fly out - bunt</option>');
            options.push('</optgroup>');
            break;
        case 'Hit':
            options.push('<optgroup label="Batter is safe">');
            options.push('<option value="1B">Single</option>');
            options.push('<option value="2B">Double</option>');
            options.push('<option value="3B">Triple</option>');
            options.push('<option value="HR">Homerun</option>');
            options.push('<option value="1BB">Single - bunt</option>');
            options.push('<option value="2BG">Double - ground rule</option>');
            options.push('<option value="IHR">Homerun - inside the park</option>');
            options.push('</optgroup>');
            break;
        case 'Sacrifice':
            options.push('<optgroup label="Batter is out">');
            options.push('<option value="SH">Sacrifice bunt</option>');
            options.push('<option value="SF">Sacrifice fly</option>');
            options.push('<option value="FSF">Sacrifice fly in foul territory</option>');
            options.push('</optgroup>');
            options.push('<optgroup label="Batter is safe">');
            options.push('<option value="SHE">Sacrifice bunt with fielding error</option>');
            options.push('<option value="SHET">Sacrifice bunt with throwing error</option>');
            options.push('<option value="SHEF">Sacrifice bunt with dropped fly</option>'); // code ends with "F" for easier output transformation
            options.push('<option value="SHFC">Sacrifice bunt with FC</option>');
            options.push('<option value="SFE">Sacrifice fly with error</option>');
            options.push('<option value="SFO">Dropped sacrifice fly + forced out</option>');
            options.push('</optgroup>');
            break;
        case 'FC':
            options.push('<optgroup label="Batter is safe">');
            options.push('<option value="O">Occupied</option>');
            options.push('<option value="FC">Fielder\'s choice</option>');
            options.push('</optgroup>');
            break;
        case 'Error':
            options.push('<optgroup label="Batter is safe">');
            options.push('<option value="EF">Fielding error</option>');
            options.push('<option value="ET">Throwing error</option>');
            options.push('<option value="ED">Dropped fly</option>');
            options.push('<option value="EDF">Dropped foul</option>');
            options.push('</optgroup>');
            break;
        case 'Advance':
            options.push('<optgroup label="Batter is safe">');
            options.push('<option value="BB1">Base on balls</option>');              // "1" indicates the numbering should be included in output
            options.push('<option value="IBB1">Intentional base on balls</option>'); // "1" indicates the numbering should be included in output
            options.push('<option value="HP">Hit by pitch</option>');
            options.push('</optgroup>');
            break;
        case 'OBR':
            options.push('<optgroup label="Batter is out">');
            options.push('<option value="OBR1_">1 - Illegally batted ball</option>');
            options.push('<option value="OBR2_">2 - Bunting foul third strike</option>');
            options.push('<option value="OBR3_">3 - Touched by own batted ball</option>');
            options.push('<option value="OBR4_">4 - Interfering with the catcher</option>');
            options.push('<option value="OBR5_">5 - Failing to bat in proper turn</option>');
            options.push('<option value="OBR6_">6 - Refusing to touch 1st base</option>');
            options.push('<option value="OBR8_">8 - Infield Fly that is not caught</option>');
            options.push('<option value="OBR14_">14 - Interference by a preceding runner</option>');
            options.push('</optgroup>');
            break;
        case 'Other':
            options.push('<optgroup label="Batter is out">');
            options.push('<option value="A">Appeal play</option>');
            options.push('<option value="LT">Lost turn</option>');
            options.push('</optgroup>');
            break;
    }
    return options;
}

// list of specific actions based on selected base action for runner
//   action - selected base action
//   group - invoking input group
function renderRunnerSpecificActionOptions(action, group) {
    const options = [];
    switch (action) {
        case 'adv':
            options.push('<optgroup label="Runner is safe">');
            options.push('<option value="ADV">Advanced by batter</option>');
            options.push('</optgroup>');
            break;
        case 'nadv':
                options.push('<optgroup label="Runner stays">');
                options.push('<option value="NADV">No advance</option>');
                options.push('</optgroup>');
                break;
        case 'exb':
            options.push('<optgroup label="Runner is safe">');
            options.push('<option value="WP">Wild pitch</option>');
            options.push('<option value="PB">Passed ball</option>');
            options.push('<option value="BK">Balk</option>');
            options.push('<option value="IP">Illegal pitch</option>');
            options.push('</optgroup>');
            break;
        case 'ste':
            options.push('<optgroup label="Runner is safe">');
            options.push('<option value="SB">Stolen base</option>');
            options.push('<option value="CSE">Caught stealing with fielding error</option>');
            options.push('<option value="CSET">Caught stealing with throwing error</option>');
            options.push('<option value="CSN">Caught stealing with fielding error (no advance)</option>');
            options.push('<option value="CSNT">Caught stealing with throwing error (no advance)</option>');
            options.push('<option value="POE">Picked off with (throwing) error</option>');
            options.push('</optgroup>');
            options.push('<optgroup label="Runner is out">');
            options.push('<option value="CSO">Caught stealing</option>');
            options.push('<option value="PO">Picked off</option>');
            options.push('</optgroup>');
            break;
        case 'fdc':
            options.push('<optgroup label="Runner is safe">');
            options.push('<option value="T">On the throw</option>');
            options.push('<option value="O/">Indifference</option>');
            options.push('</optgroup>');
            break;
        case 'err':
            options.push('<optgroup label="Runner is safe">');
            options.push('<option value="EF">Decessive fielding</option>');
            options.push('<option value="ET">Decessive throwing</option>');
            options.push('<option value="eF">Extra base fielding</option>');
            options.push('<option value="eT">Extra base throwing</option>');
            options.push('<option value="se0">Same error (Batter)</option>');
            if (!(group.includes('1'))) {
                options.push('<option value="se1">Same error (Runner at 1st)</option>');
            }
            if (!(group.includes('2'))) {
                options.push('<option value="se2">Same error (Runner at 2nd)</option>');
            }
            if (!(group.includes('3'))) {
                options.push('<option value="se3">Same error (Runner at 3rd)</option>');
            }
            options.push('<option value="ENF">Decessive fielding (no advance)</option>');
            options.push('<option value="ENT">Decessive throwing (no advance)</option>');
            options.push('</optgroup>');
            break;
        case 'out':
            options.push('<optgroup label="Runner is out">');
            options.push('<option value="GO">Force out</option>');
            options.push('<option value="GO">Tag out</option>');
            options.push('<option value="A">Appeal play</option>');
            options.push('</optgroup>');
            break;
        case 'obr':
            options.push('<optgroup label="Runner is out">');
            options.push('<option value="OBR7_">7 - Refusing to advance from 3rd base to HP</option>');
            options.push('<option value="OBR9_">9 - Touched by a fair ball</option>');
            options.push('<option value="OBR10_">10 - Running out of line to avoid being tagged</option>');
            options.push('<option value="OBR11_">11 - Passing another runner</option>');
            options.push('<option value="OBR12_">12 - Running the bases in reverse order</option>');
            options.push('<option value="OBR13_">13 - Interfered with a fielder</option>');
            options.push('<option value="OBR15_">15 - Runner left early</option>');
            options.push('</optgroup>');
            break;
    }
    return options;
}