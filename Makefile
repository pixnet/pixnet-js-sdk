
all:
	mkdir dist || true
	rm -fr dist/*
	coffee -o dist -c src/*.coffee

