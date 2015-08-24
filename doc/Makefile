DOT ?= dot
DOT_FILES = $(wildcard *.dot)

all: $(DOT_FILES:.dot=.png)

.dot.png: $<
	$(DOT) -Tpng $< -o $@

.SUFFIXES: .dot .png
