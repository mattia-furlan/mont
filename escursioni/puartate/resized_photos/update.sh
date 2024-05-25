#!/bin/sh

HTTP_FOLDER=.http

# just for safeness
if [ ! -e index.html ] || [ ! -e style.css ] || [ ! -d escursioni ] || [ ! -d $HTTP_FOLDER ] ; then
	echo "Not in website root!"
	exit 1
fi

SKIP_BUILD=0
SKIP_SYNC=0
SKIP_COMMIT=0

for arg in $@ ; do
	if [ $arg = "-sb" ] ; then
		SKIP_BUILD=1
	elif [ $arg = "-ss" ] ; then
		SKIP_SYNC=1
	elif [ $arg = "-sc" ] ; then
		SKIP_COMMIT=1
	fi
done

if [ $SKIP_BUILD = "0" ] ; then
	~/.scripts/buildAll_mont_html.sh
	if [ $? -ne 0 ] ; then
		echo "buildAll_mont_html.sh failed"
		exit 1
	fi
else
	echo "*** Skipping build"
fi

#if [ -d $HTTP_FOLDER ] ; then
#	rm -rf $HTTP_FOLDER
#fi
#mkdir -p $HTTP_FOLDER

if [ ! -d $HTTP_FOLDER ] || [ ! -d $HTTP_FOLDER/.git ] ; then
	"Missing .http git repository"
	exit 1
fi

##

if [ $SKIP_SYNC = "0" ] ; then
	echo "*** Start rsync"

	rsync index.html $HTTP_FOLDER/
	rsync _intro/* $HTTP_FOLDER/
	rsync style.css $HTTP_FOLDER/
	rsync jquery-3.6.1.js $HTTP_FOLDER/
	rsync nav.html $HTTP_FOLDER/
	rsync icon300.png $HTTP_FOLDER/
	rsync -r materiale $HTTP_FOLDER/
	for esc in escursioni/*/ ; do

		old_hash="!" # dummy
		if [ -f "${esc}.hash" ] ; then
			old_hash=$(cat "${esc}.hash")
		fi

		echo "!" > "${esc}.tmp_hash" # not to be empty
		[ -e "${esc}content.yml" ] && cat "${esc}content.yml" >> "${esc}.tmp_hash"
		[ -d "${esc}resized_photos" ] && ls -l "${esc}resized_photos" >> "${esc}.tmp_hash"
		new_hash=$(md5 "${esc}.tmp_hash" | cut -d ' ' -f 4)

		echo $new_hash > "${esc}.hash"
		rm "${esc}.tmp_hash"


		if [ "$new_hash" == "$old_hash" ] ; then
			echo "$esc is the same"
			continue
		fi

		echo "rsync'ing $esc"
		#if [ -d "${esc}resized_photos" ] && [ -e "${esc}index.html" ] ; then
		if ( cd "$esc" ; ~/.scripts/is_esc_ready.sh ) ; then
			[ -e "${esc}content.yml" ] && git add "${esc}content.yml"
			( cd $esc && used_photos.sh )
			mkdir -p "$HTTP_FOLDER/${esc}resized_photos/tmp"
			#cat ${esc}.file_list.txt 
			cat "${esc}.file_list.txt" | xargs -n 1 -I {} mv "${esc}resized_photos/{}" "${esc}tmp/{}"
			rsync -r --delete "${esc}tmp/" "$HTTP_FOLDER/${esc}resized_photos/"
			( cd "${esc}tmp" ; mv * "${esc}resized_photos/" )
			rsync "${esc}index.html" "$HTTP_FOLDER/${esc}"
		elif [ -e "${esc}preview/index.html" ] ; then
			mkdir -p "$HTTP_FOLDER/${esc}/resized_photos"
			rsync "${esc}preview/index.html" "$HTTP_FOLDER/${esc}index.html"
			rsync "${esc}preview/_preview.JPG" "$HTTP_FOLDER/${esc}resized_photos/_preview.JPG"
		fi
	done
else
	echo "*** Skipping rsync"
fi

##

if [ $SKIP_COMMIT = "1" ] ; then
	echo "*** Skipping commit"
	exit 0
fi

echo ""
echo "*** Updating mont-source"
git pull
git add -u
git commit -m "Update mont-source"
git push

#

echo ""
echo "*** Updating mont"
cd $HTTP_FOLDER
git pull
git add -A
git commit -m "Update mont-http"
git push

cd ..