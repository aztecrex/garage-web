#!/bin/bash

set -e


cd "$(dirname "$0")"
build_dir="./build"


origin='garagewebsitestaticweb7a15b5ba-origin7345f895-16h5mkbq1uppr'

upload() {
    local dest="s3://${origin}"
    local src="$build_dir"
    # upload everything except index.html with long TTL
    aws s3 cp \
       --recursive \
       --cache-control 'max-age=31536000' \
       "${src}/static" \
       "$dest/static/"

    for f in $(ls ${src}/); do
        # upload undistinguished files with no cache
        if [ "$f" == "static" ]; then
            echo skip $f
        else
            aws s3 cp \
            --cache-control 'max-age=900,s-maxage=30' \
            "${src}/${f}" \
            "$dest"
        fi
    done

}

upload

