let sprite_raw_values = {
    bullet:
["y",
 "w"],
    rocket: 
["........rrwwwwww ................ ............... .............. .............. ....w......... .......w.......",
"............www. ................ ............... .............. .w............ ....w......... .......w.......",
"...........www.. ..........rwww.. ..........r.... w............. .ww........... ....w......... .......w.......",
".....rrwwbwww... ............wwww ww....r....r... .w....r..r.... ..ww.......... ...www........ ......www......",
"........bwwwwrr. ......rwwb.www.. .wwww.bw..wwww. ..ww...w..r... ..wwww.r...... ...www..r..... ......www......",
".......wwwwwrrr. ...ww...bwww.... ..wwwwwwwwwwwww ..www..bw..w.. ..wwwwwbw.r... ....www.w..... ...r..www..r...",
"...wwwwwwrrwww.. wwwwwwwwwwwwrr.. ...wwwrrwww.... ...wwwwwwwwww. ...wwwwwww.r.. ..r.wwwww..... ...r..www..r...",
"wwwwwwwwrrwwwwww ...wwwwrrrwrrr.. ...wwwrwwwrr... ....wrrwwwwwww .rbwrrwwwwwww. ..w.wrwwwb.r.. ...w.wwwww.w...",
"...wwwwwwrrwww.. .....wwwrwwww... ....wwwwwwwr... .r..wrwwwwr... ..wwrwwwwwwwww ..wbwrrwww.w.. r..wbwwrwwbw..r",
".......wwwwwrrr. ......wwwwwwww.. ...rbwwwwww.... ..wbwwwwwrr... ...wwwwwrr...w ..bwwrwwwwwww. r..bwwrrrwwb..r",
"........bwwwwrr. ....rwwwwwrrr... ....wwwwrwww... ...wwwwww..... ...wwwwwwr.... r..wwwwwrwwww. w..wwwrwrwww..w",
".....rrwwbwww... .......bwwwrr... .....wwwrr..... .r..wwwr.w.... r.wwwrwww..... w.wwwrwwrr..ww w.wwwwwwwwwww.w",
"...........www.. .........ww..... ....r.ww....... ..r.wwrr..w... .rww.rr.w..... www.rrwwrr...w wwwwwrwwwrwwwww",
"............www. .......rwww..... .....rww....... ...www........ ..ww.......... www.rr.w...... www.rrwwwrr.www",
"........rrwwwwww .........www.... ......ww....... ....ww........ ..ww.......... .w............ ww..rr.w.rr..ww",
"................ ...........ww... .......ww...... .....w........ ...w.......... .w............ w......w......w",],
    rocket_inverse:
["........@@rrrrrr ................ ............... .............. .............. ....r......... .......r.......",
"............rrr. ................ ............... .............. .r............ ....r......... .......r.......",
"...........rrr.. ..........@rrr.. ..........@.... r............. .rr........... ....r......... .......r.......",
".....@@rrbrrr... ............rrrr rr....@....@... .r....@..@.... ..rr.......... ...rrr........ ......rrr......",
"........brrrr@@. ......@rrb.rrr.. .rrrr.br..rrrr. ..rr...r..@... ..rrrr.@...... ...rrr..@..... ......rrr......",
".......rrrrr@@@. ...rr...brrr.... ..rrrrrrrrrrrrr ..rrr..br..r.. ..rrrrrbr.@... ....rrr.r..... ...@..rrr..@...",
"...rrrrrr@@rrr.. rrrrrrrrrrrr@@.. ...rrr@@rrr.... ...rrrrrrrrrr. ...rrrrrrr.@.. ..@.rrrrr..... ...@..rrr..@...",
"rrrrrrrr@@rrrrrr ...rrrr@@@r@@@.. ...rrr@rrr@@... ....r@@rrrrrrr .@br@@rrrrrrr. ..r.r@rrrb.@.. ...r.rrrrr.r...",
"...rrrrrr@@rrr.. .....rrr@rrrr... ....rrrrrrr@... .@..r@rrrr@... ..rr@rrrrrrrrr ..rbr@@rrr.r.. @..rbrr@rrbr..@",
".......rrrrr@@@. ......rrrrrrrr.. ...@brrrrrr.... ..rbrrrrr@@... ...rrrrr@@...r ..brr@rrrrrrr. @..brr@@@rrb..@",
"........brrrr@@. ....@rrrrr@@@... ....rrrr@rrr... ...rrrrrr..... ...rrrrrr@.... @..rrrrr@rrrr. r..rrr@r@rrr..r",
".....@@rrbrrr... .......brrr@@... .....rrr@@..... .@..rrr@.r.... @.rrr@rrr..... r.rrr@rr@@..rr r.rrrrrrrrrrr.r",
"...........rrr.. .........rr..... ....@.rr....... ..@.rr@@..r... .@rr.@@.r..... rrr.@@rr@@...r rrrrr@rrr@rrrrr",
"............rrr. .......@rrr..... .....@rr....... ...rrr........ ..rr.......... rrr.@@.r...... rrr.@@rrr@@.rrr",
"........@@rrrrrr .........rrr.... ......rr....... ....rr........ ..rr.......... .r............ rr..@@.r.@@..rr",
"................ ...........rr... .......rr...... .....r........ ...r.......... .r............ r......r......r",],
    crab_green:
[".......s..sssss. ........s...... ...s....s...... ......s....... ...s..s....... ......s..s.... ......s.s...... ......s.s......",
".......ssssoooss ..s....sss..... ...s...ss...... ......s....... ..ssoos....... ....ssoos..... ...ssoosooss... ...ssoosooss...",
"......sssoosooss ..ss.sssssss... .soos.sssssss.. ...soo..ss.ss. ..osos..sss... .ssoosoo...... ....soosoos.... ....soosoos....",
"..s...sssssssss. ..os.sssssss... sssssysssoooss. ..s.oossssss.. ssossyyssss... ..ssossssss... .....sssss..... .....sssss.....",
"..ss.sssss...... .soosyys...ss.. .oosyyyysssosss ..oossyyssss.. ..ssyyyyssss.. ....sysyysss.s ....syysyys.... ...ssyysyyss...",
"..oosyyyy....... .sssyyyyy..sss. .osyyyyo...sss. ..oossyyy.sss. ...yyyyysssss. ..ssyyyyyssss. ..sssyyyyysss.. ..sssyyyyysss..",
"ssoosyyyyoo..... soossyyyoo..ss. ss.yyyy........ ss.syyyyyy.sss ..ssyyyo..ssos ..ssyyyyyy.ss. sssssyyyyysssss sssssyyyyysssss",
"..ssssyyy....... .oosyyyy.....ss ...syyoo....... ...syyyyyo.sss .sssyo.o..soos .ssssyyyy..ss. .ssssyyyyyssss. .sss.yyyyy.sss.",
"ssoosyyyyoo..... .s.syyyyoo..... ..ssss......... ..sssyyy.o..ss sssss......sss ssss.yo.o..ss. .soss.o.o.ssos. ..ss..o.o..ss..",
"..oosyyyy....... s..sssy......s. ..ssss......... ..sss.yoo...ss ..sos......sss .sss..o.o.sss. ssos..o.o..soss ..ss..o.o..ss..",
"..ss.sssss...... ...sss...s.ss.. ..ssssss....... ...sss......s. ..sos......... ..ss.......ss. soss.......ssos ..sss.....sss..",
"..s...sssssssss. ....ssssssss... ....sssoss..... ..ssssss....s. ..soos........ ..ssss....ss.. soos.......soos ...ss.....ss...",
"......sssoosooss .....ssssss.... .....sooss..... ..s..sssssss.. ..ssss........ ....sss...s... soos.......soos ....ss...ss....",
".......ssssoooss ....s.......... ......ssss..... ......ssss.... ...sss........ .....sss.s.... ssss.......ssss .....ss.ss.....",
".......s..sssss. ............... ............... .............. ....s......... .......s...... .ss.........ss. ......s.s......",],
    crab_blue:
[".......b..bbbbb. ........b...... ...b....b...... ......b....... ...b..b....... ......b..b.... ......b.b...... ......b.b......",
".......bbbbpppbb ..b....bbb..... ...b...bb...... ......b....... ..bbppb....... ....bbppb..... ...bbppbppbb... ...bbppbppbb...",
"......bbbppbppbb ..bb.bbbbbbb... .bppb.bbbbbbb.. ...bpp..bb.bb. ..pbpb..bbb... .bbppbpp...... ....bppbppb.... ....bppbppb....",
"..b...bbbbbbbbb. ..pb.bbbbbbb... bbbbbvbbbpppbb. ..b.ppbbbbbb.. bbpbbvvbbbb... ..bbpbbbbbb... .....bbbbb..... .....bbbbb.....",
"..bb.bbbbb...... .bppbvvb...bb.. .ppbvvvvbbbpbbb ..ppbbvvbbbb.. ..bbvvvvbbbb.. ....bvbvvbbb.b ....bvvbvvb.... ...bbvvbvvbb...",
"..ppbvvvv....... .bbbvvvvv..bbb. .pbvvvvp...bbb. ..ppbbvvv.bbb. ...vvvvvbbbbb. ..bbvvvvvbbbb. ..bbbvvvvvbbb.. ..bbbvvvvvbbb..",
"bbppbvvvvpp..... bppbbvvvpp..bb. bb.vvvv........ bb.bvvvvvv.bbb ..bbvvvp..bbpb ..bbvvvvvv.bb. bbbbbvvvvvbbbbb bbbbbvvvvvbbbbb",
"..bbbbvvv....... .ppbvvvv.....bb ...bvvpp....... ...bvvvvvp.bbb .bbbvp.p..bppb .bbbbvvvv..bb. .bbbbvvvvvbbbb. .bbb.vvvvv.bbb.",
"bbppbvvvvpp..... .b.bvvvvpp..... ..bbbb......... ..bbbvvv.p..bb bbbbb......bbb bbbb.vp.p..bb. .bpbb.p.p.bbpb. ..bb..p.p..bb..",
"..ppbvvvv....... b..bbbv......b. ..bbbb......... ..bbb.vpp...bb ..bpb......bbb .bbb..p.p.bbb. bbpb..p.p..bpbb ..bb..p.p..bb..",
"..bb.bbbbb...... ...bbb...b.bb.. ..bbbbbb....... ...bbb......b. ..bpb......... ..bb.......bb. bpbb.......bbpb ..bbb.....bbb..",
"..b...bbbbbbbbb. ....bbbbbbbb... ....bbbpbb..... ..bbbbbb....b. ..bppb........ ..bbbb....bb.. bppb.......bppb ...bb.....bb...",
"......bbbppbppbb .....bbbbbb.... .....bppbb..... ..b..bbbbbbb.. ..bbbb........ ....bbb...b... bppb.......bppb ....bb...bb....",
".......bbbbpppbb ....b.......... ......bbbb..... ......bbbb.... ...bbb........ .....bbb.b.... bbbb.......bbbb .....bb.bb.....",
".......b..bbbbb. ............... ............... .............. ....b......... .......b...... .bb.........bb. ......b.b......",],
    bee:
[".......... ............ .....rrr.... ............ .............. ........... ............. .........",
".rrr...r.. ..rrr....... ....rrrr.... .....rr..... ........r.r... ........r.. ............. .........",
".rrrr.rrr. .....rr..... .....rrrr... ......rr.... .....b..rrrr.. ........r.. ..r..b.b..r.. r.......r",
"rrrrrrrrr. ....w.r.rrrr ..b....rrrr. ...b.w.rr... ...b..b..rrr.. r....b..r.. rrr..b.b..rrr r..b.b..r",
"....rrrrrr ...brbrrrrrr ...brwrrrrr. ..b.rw.r.... ....b.rw..rr.. r..bwrw..r. rrr.wrwrw.rrr r.wrwrw.r",
"..wwrrrr.. ...wbbwwrr.. .b..wwrrrrr. ...rwwwr.rr. .r..rwwwrrrr.. r.wrbbbbrr. rrr.wwwww.rrr r.wwwww.r",
"bbrwwbbwb. ..brbbwwbb.. ..brwwwbrrrr r.wwwwbbrrrr rrr.wwwwrrrrrr .r.bbbbr... .rrrrwwwrrrr. rrrwwwrrr",
"..wwwbbwb. ...wbbwwbbb. ...wwwbbww.. rr..wbbbw.rr rrr.rrwbbrrrr. .rrrwwwrrr. ..rrrbbbrrr.. ..rbbbr..",
"bbrwwbbwb. ....brrwbb.. rr..rrbwwb.. .rrrrbbwwb.. rrrrrrbbwwrrrr ...rwwwwrr. .rrrrbbbrrrr. rrrbbbrrr",
"..wwrrrr.. rrr.r.rrr... .rr.rrrwbbb. ..r..rwwbb.. ..rrrrrwwb.r.. ..rrrbbbrrr rrrrrwwwrrrrr rrrwwwrrr",
"....rrrrrr ...rr.rrrr.. rrrrrrrr.... ....rr.bbb.. ...rrrrwbb.... ..rrrbbb.rr .rrr.bbb.rrr. rr.bbb.rr",
"rrrrrrrrr. ........rr.. .rrrrrrrr... ....rrr..... ...rrrr..b.... ..rr..b.... ...r.....r... rr..b..rr",
".rrrr.rrr. ............ .....rrr.... .....rr..... ......r....... ..rr....... ............. .........",
".rrr...r.. ............ .....r.r.... ............ .............. ........... ............. .........",],
    bee_queen:
[".......... ............ ....b........ ............. ........b..... ........... ............. .........",
".......bbb ............ ....b........ .....b....... ....y.y.b..... ........b.. ............. .........",
"b.....bbbb ...b........ .....b....bb. ......b...... ....yrrb...... ....y...b.. .b....y....b. b...y...b",
".b...bbbbb ....b....... ...yr.bbbbbbb ..y.ryb...... ...yryyyb..... ...ryryb... ..b.yryry.b.. b.yryry.b",
"..b.bbbb.. ...yb.bbbbbb .yyrrybbbbbbb ...yrryb..... bb.rryyybbbbb. b.yryrr.... ...brryrrb... .brryrrb.",
".yrybb.... ..rryybbbbbb ..ryyyrb.b.b. ..rryyybbbb.. ..b.yyyrbbbbbb .bbyyyybb.. ....yyyyy.... ..yyyyy..",
".rryyrryr. .yyyyyrr.... .yryyyrry.... b.yryyyrybbb. ...bbrrrr.bbbb ...yyyybb.. ...bbyyybb... .bbyyybb.",
"yyyyyrryrr ..rryyrryr.. ..byyrryyr... .bbyyyrrybbbb ...bbbryy...bb ..bbrrr.bb. ..bbbrrrbbb.. .bbrrrbb.",
".rryyrryr. ..yryyrryrr. bb.bbbryrr... ...bbrryyr.b. ...bb.yyrr.... ..bbrrrr.bb .bbb.rrr.bbb. bb.rrr.bb",
".yrybb.... ..b.bb.ryr.. ....bb..r.... ....byyyr.... ...bbb.rr..... ..bb.yyy.bb bbbb.yyy.bbbb bb.yyy.bb",
"..b.bbbb.. bb..bbb..... ....bbb...... ....bbbr.r... ..bbb......... ..bb.rrr.bb bbb..rrr..bbb bb.rrr.bb",
".b...bbbbb ......bbbb.. ....bbb...... ....bbb...... ..bbbb........ ..bb..r.... bbb...r...bbb bb..r..bb",
"b.....bbbb .......bbb.. ....bbbb..... .....bbb..... ...bb......... ..bb....... ............. .........",
".......bbb ............ .....bbb..... ......b...... .............. ........... ............. .........",],
    fireblaze:
[".^^^^^..... ..^^....... .....^^..... .......^^.. ........^... ............ ...........",
"...yy^^.... ...^^^^.... ......^^^... ........^^. .........^.. .....o....^. .....o.....",
"...oyy^^... ....yy^.... .......y^^.. ........y^^ ....oo...^^. ....oooo..^. ^...ooo...^",
"..ooyyy^^.. ...oyy^^... ....ooyyy^.. ...ooooyyy^ ....ooooyy^. ^...oooooy^^ ^..ooooo..^",
".ooyyy..... .oooyyy^^.. ..oooyyyy^.. ...ooyyyyy^ ...oooyyyy^^ ^^.ooyoyyyy^ ^yooyoyooy^",
"oooooyyyyyy oooyyyy.... ..oooyyyy^^. ...oyoyyyy^ ^..oyyoyyy^. .^yyyyoyyy^^ ^yyyyoyyyy^",
".ooyyy..... .ooooyyyy.. ...oyooy..^. ...oyyoyyy^ ^^.yyyoyyy^. .^yyyyyyyy^. ^^yyyyyyy^^",
"..ooyyy^^.. .ooyyy..yyy ...oyyyyy... ^..yyyyy..^ .^yyyyyy.y^. .^^^yyy.y^^. .^^y.y.y^^.",
"...oyy^^... ..oyyyy.... ^..yyyy..yy. ^^yyyyy.y.. .^^yyy.y..^. ...^^.y..^.. ..^^.y.^^..",
"...yy^^.... ..yyyy^^... .^^yyyyy..yy .^^yyyy..y. ..^^^^..y... ....^.yy.... ...^.y.^...",
".^^^^^..... ^^^y^^^.... ..^^^^^^^... ..^^^^^^..y .....^^.yy.. .......y.... .....y.....",
"........... ..^^^...... ....^....... ........... .........y.. .......y.... .....y.....",],
    scorpion:
["........... ..cc........ .....c.... ............ .......... ........... ...........",
".cc........ ...cc....... ......c... .......c.... .......c.c ........... ...........",
"..ccc...... ..cccc...... ....cccc.. .....ccc.... .....r.ccc ....r.r.c.c ....r.r....",
".ccccc..... ....cc....d. ..r..ccc.. ...r..ccc... ...r.r..cc ....r.r.ccc c.c.r.r.c.c",
".....c..... rr...c.....d ...r...c.. ..r.r..cc... ....rd..cc c.c..d...cc ccc..d..ccc",
"rr.ddddd... ..dddd.....d .rrddd.c.. ...rddd.c... ..c..ddd.c ccc..ddd.cc .cc.ddd.cc.",
"..dddddddd. rr.ddddd..d. ....dddd.. .c..dddd.... c.cc.dddc. .ccc.dddcc. .cc.ddd.cc.",
"rr.ddddd..d ...ddddddd.. cc..ddddd. .cc.ddddd..d .ccc..ddd. ..cccdddd.. ..ccdddcc..",
".....c....d cc..cdd..... .ccc.cddd. cccc.dddd..d ..ccccdddd ......ddd.. ....ddd....",
".ccccc...d. .cccc....... ccccc..d.d ..ccc.ddd..d .......ddd ......dd... ....ddd....",
"..ccc...d.. cccc........ .........d .........dd. .........d .......d... .d...d.....",
".cc........ ............ .........d ............ .........d .......d..d ..d..d.....",
"........... ............ .......dd. ............ .......dd. ........dd. ...dd......",],
    goblin:
[".......gggg. ............ ............ ........... ............ ...g....... .....g.....",
".....gggg... ......gggggg ....p....... g.pppp..... .g..p....... ...g....... .....g.....",
"...ppggg.... ..ppppgggg.. g.ppppgggg.. .gpggpggg.. ..gpppp..... .ppgppp.... ...ppgpp...",
"..ppgggg.... ..ppggggg... .ggggggggggg ppgggggggg. .pggggpg.... .ppgggpp... ..ppgggpp..",
"..pgggrgg... ggggggrg.... .pgrgggg.... pggrgrggg.g .pgrgggggg.. .pggrgggg.. ..pggrggp..",
"ggggrrrggggg ..pgrrrgg... ppggrrgg.... pgggrgg.... ppggrgggggg. .pggrggggg. .ggggrgggg.",
"..pgggrgg... ..pgggrggggg .pgggrgg.... ppgrggg.... .pggrrgg.gg. gggrrrggggg .gggrrrggg.",
"..ppgggg.... ..ppggggg... .ppgggggg... .gggggg.... .gggggg....g ggggggg..gg ggggggggggg",
"...ppggg.... ...pggg..... ..gggg...gg. .ggg...g... .gggggg..... ggg.ggg...g gg..ggg..gg",
".....gggg... ....ggg..... ...gg....... .ggg....g.. .gg...g..... gg...g..... g....g....g",
".......gggg. .....ggg.... ...ggg...... ..g........ .gg....g.... g....g..... g....g....g",
"............ ......ggg... ....gg...... ...g....... ..g....g.... g....g..... .....g.....",
"............ ............ ......g..... ........... ..g......... ........... ...........",],
    dragon:
["...b........ .....b...... .......b.... ..........b.. ............. .............. ...............",
"...bbw...... .....bb..... .......b.... .........bb.. ......r.....b .............. ...............",
"...bbw...... .....bbw.... ......bbww.. ....r...bbbw. ......r...bbb .......rr..... .....rr.rr.....",
"...bbww..... ....bbbw.... ..r...bbw... ....rr..bbww. ...rrbr..bbbw ....rr.r.....b ......rbr......",
"...bbww..... .r..bbww.... ..rr.bbwww.. ..rrb..bbww.. ....r.b.bbbww .....rb....bbb .......b.......",
"r..bbww..... .rr.bbww.... ..b..bbww... ...r.b.bwww.. ......bbbwww. .......b.bbbbw bbbbbb.b.bbbbbb",
"rr..bw...... ..b..bww.... rrrbbbww.... ......bwww... ....bbbbwww.. ...bbb.bbbwwww .bbbbbbbbbbbbb.",
".bbbbbbbbbbb rr.bbbb..... ....bbb..... ....bbwb..... ..bbbbwb..... bbbbbbbbwwww.. .wwwwwwbwwwwww.",
"rr..bw...... r...bw.bbb.. ...bbw.bb... ..bbbww.b.... bbbbwww.b.... .bbbwwwb..w... ...www.b.www...",
"r..bbww..... ...bbw....bb ..bbww..bb.. .bbbwww..b... ..wwww..bb... ..wwwww.b..... .......b.......",
"...bbww..... ...bwww..... .bbbww....b. bbbwww....b.. ..w.w....b... ........b..... .......b.......",
"...bbww..... ..bbww...... .bbww......b ..ww.......b. ..........b.. ........b..... .......b.......",
"...bbw...... ..bbw....... bbww........ ............b ...........b. .........b.... .......b.......",
"...bbw...... .bbww....... ............ ............. ............. .........b.... .......b.......",
"...b........ ............ ............ ............. ............. .............. ...............",],
    blade:
["....rr.......... .........rr..... ................ ....rr.......... .........rr..... ................ ....rr..........",
".....rr....bw... .........rrbw... ..rrr......bw... .....rr....bw... .........rrbw... ..rrr......bw... .....rr....bw...",
".....rrr..bww... ........rrbww... ...rrrr...bwwr.. .....rrr..bww... ........rrbww... ...rrrr...bwwr.. .....rrr..bww...",
".....rrrbbww.... rrrrr...rbww.... ....rrrr.bbwrr.. .....rrrbbww.... rrrrr...rbww.... ....rrrr.bbwrr.. .....rrrbbww....",
"rrrr..rbbwww.... .rrrrrr.bbww.... .....rrrbbwwr... rrrr..rbbwww.... .rrrrrr.bbww.... .....rrrbbwwr... rrrr..rbbwww....",
".rrrrrbbbww..... ..rrrrrbbwww.... .......bbbww.... .rrrrrbbbww..... ..rrrrrbbwww.... .......bbbww.... .rrrrrbbbww.....",
"..rrrrrbwwwrr... ....rrrbwwwrr... ......rrbbwrr... ..rrrrrbwwwrr... ....rrrbwwwrr... ......rrbbwrr... ..rrrrrbwwwrr...",
".....rrwwwwrrrr. ......bbwwwrrrr. .....rrrrwrrrr.. .....rrwwwwrrrr. ......bbwwwrrrr. .....rrrrwrrrr.. .....rrwwwwrrrr.",
".....bwrrr..rrrr .....bwrrrwrrrrr ....rrrrrw.rrrr. .....bwrrr..rrrr .....bwrrrwrrrrr ....rrrrrw.rrrr. .....bwrrr..rrrr",
".....bwwrrr..... .....brrrr...... ...rrrrr....rrrr .....bwwrrr..... .....brrrr...... ...rrrrr....rrrr .....bwwrrr.....",
"....b...rrr..... ....b.rrrr...... ...rrrr......rr. ....b...rrr..... ....b.rrrr...... ...rrrr......rr. ....b...rrr.....",
".b.b....rrrr.... .b.b..rrrr...... .b.rrr.......... .b.b....rrrr.... .b.b..rrrr...... .b.rrr.......... .b.b....rrrr....",
"..b......rrr.... ..b...rrrr...... ..b............. ..b......rrr.... ..b...rrrr...... ..b............. ..b......rrr....",
".b.b.....rrrr... .b.b..rrr....... .b.b............ .b.b.....rrrr... .b.b..rrr....... .b.b............ .b.b.....rrrr...",
"b..........rr... b......rr....... b............... b..........rr... b......rr....... b............... b..........rr...",],
    spaceship:
["................ ................ .....b.......... ..bbbbb......... ....bbb......... ....wbbb...... ....bbwbb....",
"......wbbbbbbb.. ........wbb..... ..bbbbb..wb..... .wbbbbbb..w..... ...wbbbbb....... ..bbwbbbb..... ...bbbwbbb...",
".......bbbbbbb.. ..bbbbb.bbbbbbb. ..bbbbbbb.bbb... bbwbbbbbb.bb.... .bbbwbbbbb...... .bbbbwbbbb.... ..bbbbwbbbb..",
"..bbbbb..rrr.... .bbbbbbb..rbbbb. .wbbbrbbb.bbbbb. bbbrrrrbb.bbb... .bbbwrbrbb.w.... .bbbrrrbbb.... ..bbbrrrbbb..",
".bbbbbbb..rrr... .bbbrrbbb..rr... bbwwrrrbbb.rbbbb bbbrwrrbb..bbb.. .bbbrwrrbbb.b... .bbrrwrrbb.... ..bbrrwrrbb..",
"bbbbrbbbb..rrr.. wwbrrrbbb..rr... bbbrwrrbbb.rrrbb bbbrrrbbb.rrbbb. bbbrrrrrbb.bb... .bbrrrrbbb..w. ..bbbrrrbbb..",
"bbbrrrbbb.bbbbww bbwrwrrbb.brrr.. bbbbrrrbbb.rrr.. bbbrrbrbb..rrbbb .bbbrrrbbb..bb.. .bbbbrrbbb.bb. w.bbbbrbbbb.w",
"wwwrwrrbrrrrbbbb bbbrrrrbrrbbbb.. .bbrrrbbr.brrr.. .bbbbbbr...rr.bb ..bbbbbbbb.rbbb. ..bbbbbbb..bb. bb.bbbbbbb.bb",
"bbbrrrbbb.bbbbww bbbbrbbbb.rrbbww .bbbbbbbbrrbbr.. ..bbbbb.rbbrr... ..bbbbbrb..rrbb. wb.bbbrb..rbb. bb..bbrbb..bb",
"bbbbrbbbb..rrr.. .bbbbbbb..bbbbbb ..bbbbbb.brrbb.. ........brbbr... .w..bbb.rb.rrbbb bb....r..rrrbb bbr...r...rbb",
".bbbbbbb..rrr... ..bbbbb..rrrr.ww ....b.....bbbbww .wbb.r..bbbb.... .bbb...brrbrr.b. bbr..bbrbrr.bb bbrr.brb.rrbb",
"..bbbbb..rrr.... ........rrrr.... ...w.b.rrrrrbwb. ..bbbrrrrbbbw... ..bbrrrrbrbr.... .bbrrrbrbrr.bb bbrrrbrbrrrbb",
".......bbbbbbb.. ......bbbr...... ....bbbbrrr...w. ...bbbrrrr.wbw.. ..bbbrrrbbbb.... .bbrrrbbbr..bb bb.rrbbbrr.bb",
"......wbbbbbbb.. .....wbbbbbbb... ......bbbb...... ....bbb.....wb.. ...bbrrrrbbw.... .bb..rbbb..... bb..rbbbr..bb",
"................ .........bbbb... .......bbbb..... .....bbb........ ...bbb....wbw... .bb....wbw.... .....wbw.....",
"................ ................ .........b...... ......bb........ ....bb....w..... .......wbw.... .....wbw.....",],
}

