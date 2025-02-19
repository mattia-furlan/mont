window.addEventListener("beforeunload", () => {
    var scrollPositionNav = document.querySelector("#sidenav").scrollTop;
    localStorage.setItem("scrollPositionNav", scrollPositionNav);

    var scrollPositionWindow = window.scrollY;
    localStorage.setItem("scrollPositionWindow", scrollPositionWindow);


  	var searchFilter = document.getElementById('inputSearchBar').value;
    localStorage.setItem("searchFilter", searchFilter);
});
document.addEventListener("DOMContentLoaded", () => {
	$("#sidenav").load("../../nav.html", function() {
		var scrollPositionWindow = localStorage.getItem("scrollPositionWindow");
		var scrollPositionNav = localStorage.getItem("scrollPositionNav");
		//console.log("load: nav = " + scrollPositionNav + ", window = " + scrollPositionWindow);
		document.querySelector("#sidenav").scrollTop = scrollPositionNav;

		var searchFilter = localStorage.getItem("searchFilter");
  		var input = document.getElementById('inputSearchBar');
  		input.value = searchFilter;
  		input.dispatchEvent(new Event('focus'));
		input.dispatchEvent(new KeyboardEvent('keyup',{'key':'a'}));
	});
});

function doSearch(argument) {
  var input = document.getElementById('inputSearchBar');
  var filter = input.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  var menuItems = document.getElementsByClassName('nav-section-item');
  for (var i=0; i < menuItems.length; i++) {
  	var item = menuItems[i];
  	var escLink = item.getElementsByTagName('a')[0];
  	var escText = escLink.innerText.toUpperCase();
  	var escHref = escLink.getAttribute('href');
  	var escFolder="";
  	if (escHref) // 
  		escFolder = escHref.substring(3, escHref.length-1);

  	var toSearch = [];
  	if (escFolder !== "") {
  		var keywords = keywords_map[escFolder];
  		if (keywords)
  			toSearch = keywords;
  	}
  	toSearch.push(escText.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
  	
  	var found = false;
  	for (var j = 0; j < toSearch.length && !found; j++) {
  		if (toSearch[j].includes(filter))
  			found = true;
  	}
  	if (found)
  		item.style.display = "";
  	else
  		item.style.display = "none";
  }
}
var keywords_map={};
keywords_map['agarone_serai']=['LAVARA','PLAURIS','BORGO CROS','STIVANE','PACOI','NAPLIS','AGARONE','MINIERE','MINIERA','UARCHEC','PUNTA SALVOTIS','PALON DEI ZABUS','PALON DI ZAPUS','PALON DI ZAPU','SERAI','RESARTICO','RESIUTTA','POVICI'];
keywords_map['anello_muinie']=['RIU DI PLACE','CIUC DA LA MUINIE','SECONDA CENGIA PISIMONI','PRIMA CENGIA PISIMONI','VAL ALBA','CROSTIS','CENGLON','CUEL DI SORE','FORCJE DI SORE','STUA ALTA','TRALBA','PLAGNE','CENGLE ALTE','CENGE PISIMONI','PISIMONI','MUINIE'];
keywords_map['anello_stali_gnazio']=['STAVOLO DAL GNAZIO','GNAZIO','STALI DAL GNAZIO','MENAUS','SENTIERO DI SILVIO','CIUC DA LA MUINIE','SECONDA CENGIA PISIMONI','PRIMA CENGIA PISIMONI','VAL ALBA','CROSTIS','CENGLON','CUEL DI SORE','FORCJE DI SORE','STUA ALTA','TRALBA','PLAGNE','CENGLE ALTE','CENGE PISIMONI','PISIMONI','MUINIE'];
keywords_map['arghine']=['RIO NERO','RESARTICO','VETTA CRIUZE','CRIUZE','SPIC','PLECHIE','LAVARA','POVICI','RESIUTTA','ARGHINE'];
keywords_map['belepeit_padovan_ovest']=['CONTURATE','CUNTURATE','CUESTE SPICIADE','TROI DA LE SEATE','SIMON','RIU SIMON','RIU','STALI DI LURINC','STALI DAL LAURINC','BELEPEIT PADOVAN OVEST','PICCOLO BELEPEIT','BELEPEIT PRADOVAN','BELEPEIT PADOVAN','BELEPEIT'];
keywords_map['belepeit_padovan_seate']=['CONTURATE','CUNTURATE','CUESTE SPICIADE','TROI DA LE SEATE','SIMON','RIU SIMON','RIU','STALI DI LURINC','STALI DAL LAURINC','BELEPEIT PADOVAN OVEST','PICCOLO BELEPEIT','BELEPEIT PRADOVAN','BELEPEIT PADOVAN','BELEPEIT'];
keywords_map['belepeit_pale_dal_muart']=['Zè','PATOC','FORCJE','PLANANIZE','PLANANIZZA','NAURAZIS','PLAN DA LA VACJE','SCJALUTE SANTE','AEREO CHIUSAFORTE','TROIS','PAOLINI','PALE DAL MUART','BELEPEIT PADOVAN','BELEPEIT'];
keywords_map['borga_cengia_stok']=['BORGà','VAL PIAVE','VAL ZEMOLA','FORCELLA BORGà','CENGIA DEI STOK','CENGIA STOK','CENGIA BORGà','STOK'];
keywords_map['buinc']=['BIVACCO VUERICH','LUCA VERICH','VUERICH','FORON DAL BUINC','MODEON DAL BUINC','PUNTA PLAGNIS','CIMA DELLA PUARTATE','TROIS NERIS','BLACK TRACKS','SELLA BUINC','VALLONE BUINC','CREGNEDUL','BUINç','BUINC'];
keywords_map['burlaton']=['CASERA ROPA','CANAL GRANDE DI MEDUNA','LEANDRINA','LEADICIA','CANAL DAL VUAR','FORCELLA DEL PEDOLE','FORCELLA DEL CUEL','VAL SETTIMANA','BURLAT','BURLATON'];
keywords_map['caserine_basse_sud']=['DAL TIN TOFFOLUTTI','CIOL DELLE CENGE','QUARTA CENGIA','PALA DI BRENE','PALA DE BRENE','CIOLONS','CASERATA','PALASIMON','VIA DIRETTA SUD','CRESTA CASERINE','FRADELONI','CASERINE BASSE','CASERINE'];
keywords_map['cengia_caccia_scaperi']=['LASTRON DEI SCARPERI','CADIN DI SAN CANDIDO','CADIN DELLA CACCIA','VAL CAMPODIDENTRO','PUNTA PICCOLA DEI TRE SCARPERI','LAVINA DEI SCARPERI','TRE SCARPERI','CENGIA SCARPERI','CENGIA CACCIA','CENGIA DELLA CACCIA'];
keywords_map['cengia_kugy']=['FORCELLA DI RIOFREDDO','CIMA DEL VALLONE','CENGIA KUGY'];
keywords_map['cima_pussa_bortolusc']=['CANALE FRADELONI','CANALE SUD','CANALE EST','PREGOANE','FORCELLA PREGOIANE','TORRIONE','CIMA DEI TORRIONE','SENONS','CIADIN BORTOLUSC','THIMA BORTOLUTH','CIMA BORTOLUTH','CIMA BORTOLUSC','THIMA PUTHA','CIMA PUTHA','CIMA PUSSA'];
keywords_map['cimon_entralais']=['CRETA DI ENTRALAIS','PASSO ENTRALAIS','PASSO GEU ALTO','CRESTA OVEST CIMON','CIMON ENTRALAIS','CIMON'];
keywords_map['cimon_froppa']=['CRESTA DAJERON','CRESTA DEGLI INVALIDI','CRODA BIANCA','MARMAROLE','FORCELLA MARMAROLE','VALLON DEL FROPPA','CIMON DEL FROPPA'];
keywords_map['ciol_de_sass']=['GOBO','PONTE DEL GOBO','EL PIERON','CIMA VAL DE NATEMA','SPIZ VAL PIOVIN','VAL SETTIMANA','VAL PIOVIN',' CIOL DI SASS','CIOL DE SASS'];
keywords_map['ciuc_muinie']=['RIU DI PLACE','CIUC DA LA MUINIE','SECONDA CENGIA PISIMONI','PRIMA CENGIA PISIMONI','VAL ALBA','CROSTIS','CENGLON','CUEL DI SORE','FORCJE DI SORE','STUA ALTA','TRALBA','PLAGNE','CENGLE ALTE','CENGE PISIMONI','PISIMONI','MUINIE'];
keywords_map['cjampon_nubi']=['MARE DI NUBI','CJAMOC','CUARNAN','MARE DI NUBI','GLEMONE','GEMONA','CHIAMPON','CJAMPON'];
keywords_map['col_musiel']=['FRATTE','FRATE','BARCIS','CANALONE OBLIQUO','FORCIA BASSA','RESETTUM','CANALE DELLE BRENTE','CANALE SAN DANIELE','RUASSA','BETIGIA','VUOM DI BETTIGIA','OM DI BETTIGIA','COSTA LANDRONE','CUVIIL','CUVIL','STRACCIACAMICIA','VAL BETTIGIA','LANDRAVON DE VARMA','VARMA','LANDRAVON','COL MUSIEL'];
keywords_map['corda']=['CUERDA MUCULA','CUERDA MUGOLA','CUERDA PICIUL','VAL DELLA MEDA','FORCA DELLA MEDA','SPICIAT','SPICION','CUEL DELLA LUNA','CUEL DA LA LUNA','MOSEAN','LOVET','PIZZO LOVET','CUERDA','CORDA','POZZE SMERALDINE','CAZUL','CA ZUL','LAGO DEL CIUL','CIUL','CUEL FLURIT','FRASCOLA','FRASSENEIT','FRASSANEIT','GJAVONS','GIAVONS','VAL TRAMONTINA','TRAMONTI','ALTA VAL MEDUNA','MEDUNA'];
keywords_map['coz_sgrant']=['PONTE CURITE','PONTE DELLE LASTRE','CASCATE REPEPEIT','PONTE REPEPEIT','RIO RIVIS','PICCO PELOSO','COSTA DEL RACLI','CULC','COSTA STRETTA','REPEPEIT','RIO REPEPEIT','STAVOLO COZ','STAVOLO SGRANT','SGRANT','COZ','PUSTI GOST'];
keywords_map['cozarel_bas']=['PLANANIZE','PLANANIZZA','TORGUL','COSTAMOLIN','CUESTEMULIN','SOMP I DROIS DAL PUNT DI MUR','PLAN DA LE FRATE','FORCJE','PLAGNIS','RIO MOLINO','CUC DAL BOOR','ZUC DAL BOR','MONTUSEL','COZAREL','COZZAREL'];
keywords_map['cresta_enghe']=['CENGIA MANUELA','PASSO OBERENGHE','PASSO ELBEL','VIA PERATONER','PILASTRO NADIA','CANALONE SUD','CIMA ENGHE EST','CIMA OVEST','ENGHE','CRETA ALTA DI MIMOIAS','CRESTA DI ENGHE'];
keywords_map['creton_belepeit']=['JOUF','PLANANIZZA','PLANANIZE','NAURAZIS','SCLUSE','CHIUSAFORTE','PULIZE','DUUL','DUL','SEMIDE','SEMIDE DAL CRETON DI BELEPEIT','CRETON BELEPEIT','BELEPEIT'];
keywords_map['creton_clap_piccolo']=['ELBEL','CRETON DI CLAP GRANDE','TORRE SAPPADA','DEGASPERI','FORCELLA PRADIBOSCO','CRETA LIVIA','TORRE PESARIIS','TORRE DI CLAP PICCOLO','PRADIBOSCO','PASSO ELBEL','TRE LAME','CRETA DEI BRUSAZ','CRETE BRUSADE','CLAP PICCOLO','CRETON DI CLAP PICCOLO'];
keywords_map['cristallo']=['BASTON DEL PLODNER','LA LASTA','PASSO DEL CRISTALLO','MICHL INNERKOFEL','INNERKOFEL','GROHMANN','SIORPAES','PASSO TRE CROCI','PIZ POPENA','CRISTALLO'];
keywords_map['croda_bianca']=['FORMIGOLER','VAL GALLINA','SPIZ GALLINA','CANDUABO','DITTA','CIME DI PINO','COL NUDO','BORGà','TOC','VAJONT','ERTO','MESATH','MESAZ','CRODA BIANCA'];
keywords_map['cualine_traversata']=['CIMA LEADICIA','PIERASFEZZA','BURLATON','FORCELLA DEL PEDOLE','PEDOLE','CASERINE','CLAPON DAL VUAR','CANAL PICCOLO DI MEDUNA','PINEIT','SELIS','CANAL GRANDE DI MEDUNA','CANAL DAL VUAR','VUAR','CRESTA BOSCOVECCHIO','CENGLA DA LIS FONTANIS','CENGLA','STAVAI','FORCELON','FORCELLON','COLLINA ALTA','CUALINA ALTA','CUALINA BASSA','CUALINA','CUALINE'];
keywords_map['cuar_spigolo_sud']=['VAL TOCHEL','PIC DI MAI','SPIGOLO SUD CUAR','SPIGOLO SUD','CUAR'];
keywords_map['cuel_da_la_ceit']=['GLAGNò','NUVIERNULIS','PALASECCA','CUEL MAURON','CUEL DI FEDEVEIZ','FEDEVEIZ','MOGGIO','MOGGESSA','MUC','STAVOLI','PUSTOT','STAVOLO PUSTOT','PUSTOT','RUVIIS','CUEL DA LA RUVIS','CUEL DA LA RUVIIS','CEIT','CUEL DA LA CEIT'];
keywords_map['cuel_dai_sbrici']=['VAL DOGNA','SFONDERAT','DOUGAN','VLADIMIRO DOUGAN','CUEL DAI SBRICI','SFLAMBURG','MONCUSSON','MALE LAVARE','SEMIDE DAI AGNEI','JOVET BLANC','CIUC DI VALLISETTA','MUCUL','CIMONE','CIMON','VALLISETTA','PUARTATE','RIO DELLA SCALA','TISCJELAT','CJASTELAT','ROP','JOVET','SBRICI','PATOCCO','PATOC'];
keywords_map['cuel_di_lanis_canalone_sud']=['CESARIIS','PERS','LOPATA','LANTA','CUEL DI LANIS SUD','SENTIERO DEL RIO GLERIA','RIO GLERIA','SENTIERO DELLA LOPATA','SIROCHE GJALINE','ALTA VIA CAI GEMONA','CUEL DI LANIS'];
keywords_map['cuviil']=['VUOM DI BETTIGIA','BETIGIA','BETTIGIA','RESETTUM','FRATTE','FRATE','COL MUSIEL','STRACCIACAMICIA','RUASSA','VARMA','MEZZOCANALE','BARCIS','PETOUR','CUVIL','CUVIIL'];
keywords_map['deneal_diretta_sud']=['CENGLE DA RICHE','CUEL DAL MADRAC','BOSCUT DI DENDRI','BOSCUT DI FUR','RIO FONTANIS','RIO LAICEIT','RIUL LACEIT','AGADORIE DI SCAFACJ','AGADORIE DI SCAFAC','VIA DIRETTA SUD DENEAL','DENEAL SUD','DIRETTA SUD DENEAL','DENEAL'];
keywords_map['domanzon_cuole']=['LANDRE DA LE CIAURE','DOSAIP','RUVIS','RUVIIS','TRONCONERE','TRANCONERE','PALIS DI MAGLINA','DOSAIP','CIOL MAL','BALANSIN','TAMER DI DOMANZON','TAMER','CUOLE','LE CUOLE','CROCE DI CUOLE','PINZAT','DOMANZON'];
keywords_map['fedeveiz_pustot']=['CUEL DI FEDEVEIZ','CUEL DA LA CEIT','CUEL DA LA RUVIIS','STAVOLI','PUSTOT','FEDEVEIZ'];
keywords_map['forcella_mincigos']=['CLAP FORAT','CUEL FURMIAN','JOF DI DOGNA','RIO DI TERRAROSSA','RIO DAI BALINS','CHIOUT TASSOT','CHIOUT DI GUS','PALE DI CHIOUT DI GUS','FORCELLA MINCIGOS','MINCIGOS','VAL DOGNA'];
keywords_map['forcellone_fontanis']=['RUG DAI PASS',' CANAL GRANDE DI MEDUNA','CANAL PICCOLO DI MEDUNA','CANAL DAL VUAR','CENGLA DA LIS FONTANIS','CENGLA','FORCELLON','FORCELLONE',' COLLINA BASSA','COLLINA ALTA','CUALINA BASSA','CUALINA ALTA','CUALINE','CUALINA','CAZUL','CA ZUL','LAGO DEL CIUL','CIUL','CUEL FLURIT','FRASCOLA','VAL TRAMONTINA','TRAMONTI','ALTA VAL MEDUNA','MEDUNA'];
keywords_map['frascola_ciul']=['PASSO REST','TAMARUZ','FORCA DEL BEC','CJAMPIS','CHIAMPIS','AQUILA DEL FRASCOLA','FORCA DEL FRASCOLA','ANTECIMA FRASCOLA','VAL DI FISAR','ROPPA BUFFON','POZZE SMERALDINE','CAZUL','CA ZUL','LAGO DEL CIUL','CIUL','CUEL FLURIT','FRASCOLA','FRASSENEIT','FRASSANEIT','GJAVONS','GIAVONS','VAL TRAMONTINA','TRAMONTI','ALTA VAL MEDUNA','MEDUNA'];
keywords_map['frata_barbin']=['CENGIA ALTA','CENGIA','PODESTINE','GRAVE DA GERE','MEDA','POSTEDINE','CIOL DI CORNAGET','CIOL DE CORNAGET','CIOL DELLA FRATTA','CIOL DA LA FRATTA','CORNAGET','FRATA DE BARBIN','FRATTA DI BARBIN','BARBIN'];
keywords_map['gambon']=['CIMA DI TERRAROSSA','FORCA DA LIS SIERIS','LIS SIERIS','TORRIONE DA LIS SIERIS','CIMA GAMBON','CIME GAMBON'];
keywords_map['giavons']=['VAL DI FISAR','ROPPA BUFFON','POZZE SMERALDINE','CAZUL','CA ZUL','LAGO DEL CIUL','CIUL','CUEL FLURIT','FRASCOLA','FRASSENEIT','FRASSANEIT','GJAVONS','GIAVONS','VAL TRAMONTINA','TRAMONTI','ALTA VAL MEDUNA','MEDUNA'];
keywords_map['glemine']=['CJASE DAI CUARVATS','CJASE DAI CORVATS','CENGLUTE','SCJALE VUARBE','DENEAL PICIUL','NAS GRANT','NAS PICIUL','DENEAL','CJAMPON','TROI DA CENGLUTE','TROI DAI CINCENT','GEMONA','GLEMONE','GLEMINEIT','GLEMINA','GLEMINE'];
keywords_map['indrinizza']=['FORAN DAL MUS','BLASIC','PICCO DI GRUBIA','CUEL SCLAF','FORCHIA DI TERRAROSSA','TAMAROTS','TAMAROZ','PECEIT','PEZZEIT','SELLA BUIA','HLABUIA','COSTA DI SART','SDRINIZE','INDRINIZZA','SART'];
keywords_map['introduzione']=['MATTIA FURLAN','INTRODUZIONE'];
keywords_map['jof_scluse_ombrenum']=['SENTIERO DELLAQUEDOTTO','STALI DAL BECUL','FORCJE','PLANANIZZA','PLANANIZE','SCLUSE','CHIUSAFORTE','PULIZE','PINEIT','RAUNIS','IOF DI CHIUSAFORTE','JOF DI CHIUSAFORTE','JOF DI SCLUSE','OMBRENUM'];
keywords_map['jovet']=['VAL DOGNA','SFONDERAT','DOUGAN','VLADIMIRO DOUGAN','CUEL DAI SBRICI','SFLAMBURG','MONCUSSON','MALE LAVARE','SEMIDE DAI AGNEI','JOVET BLANC','CIUC DI VALLISETTA','MUCUL','CIMONE','CIMON','VALLISETTA','PUARTATE','RIO DELLA SCALA','TISCJELAT','CJASTELAT','ROP','JOVET','SBRICI','PATOCCO','PATOC'];
keywords_map['jovet_blanc']=['FORCA GALANDIN','TROI DAI PERONS DA LANEIT','LIVINAL','VAL DOGNA','SFONDERAT','DOUGAN','VLADIMIRO DOUGAN','CUEL DAI SBRICI','SFLAMBURG','MONCUSSON','MALE LAVARE','SEMIDE DAI AGNEI','JOVET BLANC','CIUC DI VALLISETTA','MUCUL','CIMONE','CIMON','VALLISETTA','PUARTATE','RIO DELLA SCALA','TISCJELAT','CJASTELAT','ROP','JOVET','SBRICI','PATOCCO','PATOC'];
keywords_map['jovet_cjadramac']=['MALA LAVARA','MALE LAVARE','PATOC','TROI DA LI CALADIS','TROI DAI PERONS DA LANEIT','TROI DAI PERONS','FORCA DEL LIVINAL','SEMIDE DAI AGNEI','RIO LAVINAL','JOVET BLANC','JOF DI CJADRAMAC','JOF DI MISDì','CADRAMAZZO','CJADRAMAç','JOVET DI CJADRAMAC','JOF','JOVET','ROBINIA'];
keywords_map['krissin']=['SPAGNOLLI','SCHIAVON','TRAVERSATA CRISSIN','CRISSIN DI AURONZO','CRISSIN DI GOGNA','CRISSIN DI LAGGIO','CRISSIN','KRISSIN'];
keywords_map['laschiplas']=['POSTOUCICCO','ALTA VIA CAI GEMONA','VEDRONZA','PERS','CESARIIS','COSTA BULA','DIRETTISSIMA LASCHIPLAS','LASCHIPLAS'];
keywords_map['ledis_cresta_est']=['STAVOLI BLANDALIN','CRESTA EST','LEDIS','MONTE LEDIS'];
keywords_map['leupa']=['LOPA','NEVEA','CANIN','FORCA SOPRA POVIZ','FORCA SOPRA MEDON','POVIZ','CRESTA LEUPA','TRAVERSATA LEUPA','MONTE LEUPA','LEUPA'];
keywords_map['libertan_chiarescons']=['VIA NORMALE VAL SETTIMANA','FRADELONI','SENTIERO FRADELONI','VAL LIBERTAN','VAL CIAMOTHE','FORCELLA LIBERTAN','MONTE LIBERTAN','LIBERTAN','CJARESCONS','CHIARESCONS'];
keywords_map['ligonto']=['CRODA DI CAMPO','CRODA DA CAMPO','CIMA DI PADOLA','CRODA DI TACCO','BIVACCO GERA','CENGIA GABRIELLA SECONDA','CENGIA GABRIELLA','CADIN DEL BISO','CIADIN BISO','CADIN BISO','CIMA BAGNI','CIMA AMBATA','CIMA DAMBATA','CRODA DE LIGONTO','CRODA DI LIGONTO'];
keywords_map['mds_mont_alt']=['BUS DEL DIAOL','VAL DEI PEZ','ZENGIA LONGA ALTA','VAL FAGARè','VAL CORAIE','COL DE LA CAZETA','COL DEI PORZ','STORNADE','PALAZZA','LA PALAZA','CIMA DELLE CORAIE','CORAIE','CRODA BIANCA',' ZIMON DE MONT ALT',' MONT ALT',' MDS','MONTI DEL SOLE'];
keywords_map['mene_borsat']=['LUCA BASSO','COL DE LA QUESTION','CIOL DE GIAEDA','CIOL DE SUSANA','FORZEL TRAMONTIN','FORZEL BORSAT','PUNTA DEL BORSAT','THENGIA DE NANUT','CENGIA DE NANUT','BOSC DE CIOCO DE SORA','BOSC DE CIOCO DE SOT','BOSC DE CIOCIO','VIERES','VACALIZZA','BOSC DA VAL','CIOL DE MENE BORSAT','MENE BORSAT'];
keywords_map['miniere_resartico']=['LAVARA','PLAURIS','AGARONE','MINIERE','MINIERA','UARCHEC','PUNTA SALVOTIS','PALON DEI ZABUS','PALON DI ZAPUS','PALON DI ZAPU','SERAI','RESARTICO','RESIUTTA','POVICI'];
keywords_map['moncusson_sflamburg']=['PATOCCO','PATOC','FORCA GALANDIN','JOVET','CJADRAMAC','CADRAMAZZO','CUEL DA LA BARETA','SFLAMBURC','SFLAMBURG','MONCUSSON'];
keywords_map['monte_torre_val_scinauz']=['SANTA CATERINA','PONTEBBA','VANCELA','CIT DI FUORI','CIT DI DENTRO','CIT','STUA SCINAUZ','TROIS NERIS','VAL SCINAUZ','SCINAUZ','TORRE','MONTE TORRE'];
keywords_map['morgenlaite']=['TRAMONTO','SIERA','TERZE','CLAP','SAURIS','MORGENLAITE'];
keywords_map['nabois_cengia_camosci']=['PELLARINI','SELLA NABOIS','BOLAFFIO-OITZINGER','VIA BOLAFFIO','VIA NORD','CENGIA CAMOSCI','SPRAGNA','CENGIA DEI CAMOSCI','NABOIS GRANDE','NABOIS'];
keywords_map['nas_piciul']=['RIO FONTANAT','AMBRUSEIT','TROI DAL CJAMOC','CRESTA DENEAL','SLAC','CJAMPON','DENEAL','GRINGHIONE','CUESTE GRINGJONE','NAS GRANT','NAS PICIUL'];
keywords_map['navastolt']=['FORCELLA DEL BUSO','CRASSIGNE DAL CRAMAR','CENGIA DEL SOLE','AVANZA','NAVASTOLT'];
keywords_map['pala_alta']=['MONTI DEL SOLE','COLON DE COSTA BRAMOSA','VAL DE PIERO','LASTREGAL','VAL MEDON','PALA BASSA','VIAZ CAMORZ E CAMORZIERI','VIAZ MIOTTO','GRASS PALA ALTA','GRASS','PALA ALTA'];
keywords_map['pale_bressa_pisandola']=['FORCELLA VACALIZZA','TORRE VACALIZZA','VACIALISSA','VACALIZZA','SCANDOLER','COL CHIAVEDOS','SCIARPENADE','SCIARPENODE','COL DI COLLE','BARBANO','PISANDOLA','VAL PISSANDOLA','VAL PISANDOLA','CIOL DELLA FEDE','CIMOLAIS','CLAUT','PALE DEL BRESSA'];
keywords_map['pale_candele']=['VAL PICCOLA','VAL GRANDE','BREGOLINA PICCOLA','SELLA DEL TURLON','COL DE BARZAN','COL DE VITOR','THENGIA SCALINET','THENGIA DADALT','THENGIA DEI RODOI','THENGIA DE ANTREGNOLER','COI DE CONTRON','COL DE CONTRON','TROI DAI PEGORERS','TURLON DE BOS DE VAL','TURLON DE VAL DE BOS','TURLON','PALE CANDELE'];
keywords_map['pale_ciuone_cresta']=['CIME PALE DE CIONE','CIME PALE DE CIUONE','CIMA POLSADOR','POLSADOR','VAL PIOVIN','CIMA CIOLESAN','LESIS','LUCA BASSO','CENGIA CIOLESAN','TRUOI DE SEP','TRUOI DE THEP','FORCELLA CITA','CRESTE DI SAN GUALBERTO','MERLE DA ON','CIOLESAN','CIONE','PALE DE CIONE','PALE DE CIUONE'];
keywords_map['pale_salens']=['RISA','STRETTI','PIANATTI','PIANI DI QUA','PIANI DI Là','RIO ROSSO','MALPLANA','LOUF','PIANI DEL MONTASIO','CUELAT','TROI DAL CUELAT','PALE DAI SALENS'];
keywords_map['palon_zabus_traversata']=['CIUCIS','CJUCIS','PUNTA AGARONE','PALE DI MISDì','CLAPADORIE','VALLONE DI SERAI','RIO SERAI','SERAI','MINIERE RESARTICO','UARCHEC','PUNTA SALVOTIS','RESIUTTA','POVICI','PALON DEI ZABUS','PALON DI ZAPUS','PALON DI ZAPU'];
keywords_map['palon_zapus']=['LAVARA','PLAURIS','AGARONE','MINIERE','MINIERA','UARCHEC','PUNTA SALVOTIS','PALON DEI ZABUS','PALON DI ZAPUS','PALON DI ZAPU','SERAI','RESARTICO','RESIUTTA','POVICI'];
keywords_map['patoc_garlitais']=['GARLITAIS','AGAR DA LIS TAIS','ZERESARIE','PATOK','FORCJE PATOC','PATOC','NAURAZIS','BELEPEIT','MONTUSEL','PLANANIZZA','PLANANIZE','PALE FRUNT','PALE DA LA FRUNT'];
keywords_map['patoc_ze']=['OMBRENUM','RIU DA LE ROTE','RIU DA LE CJAMOCE','STALI DAL CHICHI','STALI DAL BECUL','JOF DI SCLUSE','JOUF','SCJALUTE SANTE','PAOLINI','TROIS','COSTAMULINO','CUESTEMULIN','PATERNOSTRI','CUEL DI CLARI','SCLUSE','CHIUSAFORTE','ZE','PATOC'];
keywords_map['pelmo']=['CENGIA DI GROHMANN','CENGIA DI BALL','CENGIA','MATTEO OSSI','PAUL GROHMANN','JOHN BALL','SAXUM PELPHI','SAS DE PELF','PELMO'];
keywords_map['pic_di_babe']=['CALDERINO ROBEL','CUEL SCLAF','CIUC DAL CORVAT','GRANDE POIZ','BUSE DA LI BURALIS','GORIUDA','GORIUDE','GRANDE POIZ','STAVOLO BABE','STAVOLO BABA','PIANI','PIC BABE','PIC DI BABE'];
keywords_map['piccolo_siera']=['PLODN','SAPPADA','SPITZ','SIERA','PICCOLO SIERA'];
keywords_map['pisimoni_sud']=['CENGLE ALTE','CENGIONE','PUPINAT','FORCJE DIAME','PLAGNE','PISIMONI SUD','PISIMONI'];
keywords_map['pisimoni_sud_brezzi']=['FORCJE DIAME','PUPINAT','CENGE','CENGIA','PISIMON','PUCIMUN','CIUC DA LA MUINIE','PLAGNE','MUINIE','CENGE PISIMONI','CENGIA PISIMONI','BRECI','BREZZI','BREISI','RIO BREIZI','PISIMONI SUD','PISIMONI'];
keywords_map['pizzo_lovet_sud']=['VAL DELLA MEDA','FORCA DELLA MEDA','SPICIAT','SPICION','CUEL DELLA LUNA','CUEL DA LA LUNA','MOSEAN','LOVET','PIZZO LOVET','CUERDA','CORDA','POZZE SMERALDINE','CAZUL','CA ZUL','LAGO DEL CIUL','CIUL','CUEL FLURIT','FRASCOLA','FRASSENEIT','FRASSANEIT','GJAVONS','GIAVONS','STALIGIAL','VAL','VAL TRAMONTINA','TRAMONTI','ALTA VAL MEDUNA','MEDUNA'];
keywords_map['pramaggiore']=['CRODA PRAMAGGIORE','FORCELLA ALTA DI PRAMAGGIORE','VAL SETTIMANA','SENONS','CASERA PRAMAGGIORE','VAL DEL CLAP','PRAMAGGIORE'];
keywords_map['provagna_cengla_mus']=['SOMP TAMAIS','MEZZO CANALE','CHIALEDINA','CIALEDINA','FRUGNA','GIAVEIT','THENGIA DEL MUSS','THENGIA DEL MUS','CENGIA DEL MUS','CENGLA DEL MUS','CASTEL','PROVAGNA','BARCIS','CLAUT','CUVIL','CUVIIL','CONTRON','CELLINA','CELLINO'];
keywords_map['puartate']=['VAL DOGNA','SFONDERAT','DOUGAN','VLADIMIRO DOUGAN','CUEL DAI SBRICI','SFLAMBURG','MONCUSSON','MALE LAVARE','SEMIDE DAI AGNEI','JOVET BLANC','CIUC DI VALLISETTA','MUCUL','CIMONE','CIMON','VALLISETTA','PUARTATE','RIO DELLA SCALA','TISCJELAT','CJASTELAT','ROP','JOVET','SBRICI','PATOCCO','PATOC'];
keywords_map['punta_grisis']=['LAVARA','PLAURIS','POVICI','RESIUTTA','PALON','RESARTICO','ARGHINE','PUNTA GRISIS'];
keywords_map['punta_salvotis']=['LAVARA','PLAURIS','AGARONE','MINIERE','MINIERA','UARCHEC','PUNTA SALVOTIS','PALON DEI ZABUS','PALON DI ZAPUS','PALON DI ZAPU','SERAI','RESARTICO','RESIUTTA','POVICI'];
keywords_map['raibl_terza']=['BIVACCO PIUSI','OSCAR PIUSI','GRINTAVEC','URSIC','BUCHER','VALROMANA','VAL ROMANA','CINQUE PUNTE','SELLA DELLA MALGA','PORTELLA','SCIOBER','PREDIL','CAVE','RAIBL'];
keywords_map['rauret']=['CIMA LARICI','MONTE SORELI','BOSCO PENSILE DI RAURET','LAVARUCE','LAVARUZZA','STAVOLO RAURET','ANELLO DI RAURET','RAURET'];
keywords_map['rupat']=['VALLONE DEL POUL','CIUCUL DA LIS STERPIS','CRODONS','STRADA DEGLI ALPINI','STUA','SILISIA','TRONCONERE','SGRIFA','TRANCONERE','TAMER DA LA RUVIIS','RUVIIS','FONTANON DAL TASSEIT','TASSEIT','ANDREUZZI','LA COSTATA','LANDRO DEL CERAR','LANDRI DAL CERAR','CERAR','LE CUOLE','DOMANZON','DOSAIP','PALIS DI MAGLINA','MAGLINA','FORCA DEL POUL','SPICIAT','MONTE SPICION','PIZZON','SPICION','RUPAT','MONTE RUPAT'];
keywords_map['san_francesco']=['CLAUT','VAL SETTIMANA','PUSSA','SENONS','CIMA DI SAN FRANCESCO'];
keywords_map['sasso_cima_malpasso']=['FORCELLA CASTELLATI','FORCELLA BRENTONI','BRENTONI','PUPERA VALGRANDE','PUPERA','CRESTA CASTELLATI','KRISSIN','CRISSIN','FEDERA MAURIA','SASSO MALPASSO','CIMA MALPASSO','FORCELLA MAPASSO','MALPASSO'];
keywords_map['sciober_grande']=['GRINTAVEC','URSIC','BUCHER','VALROMANA','VAL ROMANA','CINQUE PUNTE','SELLA DELLA MALGA','PORTELLA','SCIOBER','PREDIL','CAVE','RAIBL'];
keywords_map['scjalute_sante']=['CERESARIE','ZERESARIE','STALI DAL BECUL','PATERNOSTRI','ZE','JOF DI SCLUSE','JOUF','FORCJE','PLANANIZE','PLANANIZZA','NAURAZIS','BELEPEIT','SCJALUTE SANTE'];
keywords_map['semide_cjalderatis']=['DOUGAN','CJALDERATIS','SFONDERAT','PUARTATE','FORCA DE LA PUARTATE','JOF DI MIEZDì','JOF DI MISDì','VAL DOGNA','CUEL DA LA LESCJE',' CUEL DA LIS JONIS','CUEL DA LIS ONIS','CUEL DI GRANVALT','GRANVALT','SEMIDE','SEMIDE DAI AGNEI'];
keywords_map['semide_dai_agnei']=['RACCOLANA ','ROP','SBRICI','FORCA DA LA PUARTATE','PUARTATE','JOVET BLANC','JOVET','SFONDERAT','JOF DI MIEZDì','JOF DI MISDì','CUEL DA LA LESCJE','LESCJE','GRANVALT','VAL DOGNA','SEMIDE DEI AGNEI','SEMIDE DAI AGNEI','SEMIDE'];
keywords_map['siroche_gjaline']=['ALTA VIA CAI GEMONA','SIROCHE DOLEGNE','SIROCHE GJALINE'];
keywords_map['sotgoliz']=['JOF DI GOLIZ','SOT GOLIZ','PLEZICHE','CLAP BLANC','JOF DI MIEZ','SALINE','LESCJA','GRANVALT','JOF DI MIEZDì','JOF DI MISDì','JOVET BLANC','JOVET','PUARTATE','SEMIDE','SEMIDE DAI AGNEI','SFONDERAT','MUCUL','CUEL DAI GJAIS','CUEL DAI GIAIS','RIO SALINE','EX CAI 655','PACIFICO','BIVACCO CIVIDALE','CAI CIVIDALE','CIMONE','SOTGOLIZ'];
keywords_map['spic']=['RIO PUNTUZ','RESARTICO','RESIUTTA','POVICI','VETTA CRIUZE','LUSUMENT','SPIC'];
keywords_map['spicion_tadola']=['PALONS','BUSA DI JAREAC','PIZZO LOVET','CUERDA','CORDA','BUTTIGNAN','SELVA','CA ZUL','CIUL','SPINESPES','TRONCONERE','TRANCONERE','RUPAT','MONTE TADDA','TADDA','ROSSA DI TADOLA','TADOLA','SPICIAT','SPICION'];
keywords_map['spik']=['SKRLATICA','LIPNICA','MARTULJEK','GOZD MARTULJEK','KRANJSKA GORA','SPIK'];
keywords_map['thengia_danut']=['STAI DE SORA','COL DE LA QUESTION','CIOL DE SUSANA','CIOL DI SUSANNA','FORZEL TRAMONTIN','PUNTA BEGARELI','MUGOLIO','CENGIA VIERES','PUNTA CLAUT','VACALIZZA','VIERES','SUSANNA','SUSANA','STAI SUSANA','CRODA BIANCIA','BOSC DE CIOCIO','CIOCIO','BOSC DE CIOCIO DE SORA','BOSC DE CIOCIO DE SOT','PUNTA DEL BORSAT','MENE BORSAT','CIOL DE MENE BORSAT','TURLON','BOS DE VAL','BOSC DE VAL','BOSC DA VAL','DANUT','NANUT','CENGIA DANUT','CENGIA NANUT','THENGIA NANUT','THENGIA DANUT','THENGIA'];
keywords_map['troi_cuelat']=['STRADE DAI CJARNEI','GORIUDA','GORIUDE','PIC DI BABE','SART','CALDERINO ROBEL','BLASIC','CUELAT','RIO DE LA CALADA','PIANI DEL MONTASIO','PIANI DI LA','ARMELLINI','TROIS NERIS','BLACK TRACKS','TROI DAL CUELAT'];
keywords_map['troi_dal_partigian']=['CIUCULON DAI ALAC','VAL CURTA','TROI DAL PARTIGIAN','TROI DAL PARTIHJAN','VAL DI FISAR','ROPPA BUFFON','POZZE SMERALDINE','CAZUL','CA ZUL','LAGO DEL CIUL','CIUL','CUEL FLURIT','FRASCOLA','FRASSENEIT','FRASSANEIT','GJAVONS','GIAVONS','VAL TRAMONTINA','TRAMONTI','ALTA VAL MEDUNA','MEDUNA'];
keywords_map['vacialissa_sciarpenade']=['POTHI','PISANDOLA','TORRE PISANDOLA','PALE DEL BRESSA','VAL PISANDOLA','SCIARPENODE','SCIARPENADE','BARBANO','MONTE BARBANO','STALLE PIOLSA','COL DI COLLE','COSTA SPESSA','CASERA VACALIZZA','CASERA TOTUC','FORCELLA VACIALISSA','FORCELLA VACALIZZA','EX CAI 380','CAI 380','SANDOLER','SANDOLAR','SCANDOLER','COVARATA','TORRE VACIALISSA','TORRE VACALIZZA','VACIALISSA','VACCALIZZA','VACALIZZA'];
keywords_map['vetta_criuze']=['PLECHIE','RIO PUNTUZ','RESARTICO','RESIUTTA','POVICI','VETTA CRIUZE','LUSUMENT','SPIC'];
keywords_map['vetta_fornezze_senons']=['CHIARESCONS','PUSSA','VAL SETTIMANA','SENONS','MEDUNA','TROI DI NARTAIS','NARTAIS','CENGLE FORNEZZE','VETTA FORNEZZE'];
keywords_map['vieres']=['CANALONE VIERES','FORCELLA DEI VIERES','COSTA NANEI','CUVIERA','CENGIA COVARATA','COVARATA','FESSURA','VAL BEVIDOUR','VAL BEVIDOR','VAL GAIOR','PONTE CONFOZ','SCANDOLER','GIAEDA','VACALIZZA','CIOL DE SUSANNA','CIOL DE SUSANA','TAC DE TUNIN','FORZEL TRAMONTIN','CIOL TRAMONTIN','CIOL SPARAVIER','CIOL SPALAVIER','COSTA SPARAVIER','SPARAVIER','SPALAVIER','COSTA SPALAVIER','CIMA SPALAVIER','PUNTA SUSANA','PUNTA SUSANNA','CIMA DEI VIERES','VIERES'];
keywords_map['vualbinis']=['LA TOFE','LUCIANO SARTORI','TROI DAL CJAMOC','CENGLE DAL CJAMOC','PRATI VUALBINIS','TROI DA VUALBINE','VUALBINE','VUALBINIS','CHIAMPON','CJAMPON'];
