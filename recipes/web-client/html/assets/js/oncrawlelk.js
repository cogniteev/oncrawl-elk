$(function() {

    /*
     * Hash helper
     */

    function getHashQueryString() {
        var hash = window.location.hash, qs = hash.indexOf('?');
        return qs == -1 ? '' : hash.substr(qs + 1);
    }

    function getHashPath() {
        var hash = window.location.hash, qs = hash.indexOf('?');
        return qs == -1 ? hash : hash.substr(0, qs);
    }

    /*
     * Date form handling
     */

    var displayFormat = 'dddd, D MMMM YYYY';
    var configFormat = 'YYYY-MM-DD';

    Date.parseDate = function( input, format ){
        return moment(input,format).toDate();
    };
    Date.prototype.dateFormat = function( format ){
        return moment(this).format(format);
    };

    function toConfigFormat(date) {
        return Date.parseDate(date, displayFormat).dateFormat(configFormat);
    }

    function toDisplayFormat(date) {
        return Date.parseDate(date, configFormat).dateFormat(displayFormat);
    }

    function getStartingDate() {
        return $('#starting-at').val();
    }

    function getEndingDate() {
        return $('#ending-at').val();
    }

    function initDatesByDefault() {
        var dates = getHashQueryString().split(':');
        if (dates.length == 2) {
            Config.endingDate = dates[1];
            Config.startingDate = dates[0];
        } else {
            Config.endingDate = new Date().dateFormat(configFormat);
            Config.startingDate = moment(new Date()).subtract('30', 'days').format(configFormat);
        }
    }

    function initForm() {
        $('#starting-at').datetimepicker({
            timepicker: false,
            value: toDisplayFormat(Config.startingDate),
            format: displayFormat,
            formatDate: displayFormat,
            onShow: function () {
                this.setOptions({ maxDate: getEndingDate() });
            }
        });

        $('#ending-at').datetimepicker({
            timepicker: false,
            value: toDisplayFormat(Config.endingDate),
            format: displayFormat,
            formatDate: displayFormat,
            onShow: function() {
                this.setOptions({ minDate: getStartingDate() });
            }
        });
    }

    function onSubmitForm(e) {
        Config.startingDate = toConfigFormat(getStartingDate());
        Config.endingDate = toConfigFormat(getEndingDate());
        updateHashLocation();
        openPage(getId(getCurrentPage()));
        e.preventDefault();
        return false;
    }

    function bindFormEvents() {
        $('.header-form').on('submit', onSubmitForm);
    }

    initDatesByDefault();
    initForm();
    bindFormEvents();

    /*
     * Grid handling
     */

    var colsCount = 12;
    var margin = 15;
    var baseHeight = 150;
    var baseWidth = 50;

    function reflowGridster() {
        var $container = $('.content');
        var g = $container.find('> .gridster > ul').data('gridster');

        var colSize = ($container.width() / colsCount) - (margin * 2);

        g.options.widget_base_dimensions = [colSize, baseHeight];

        g.$widgets.each(function (i, widget) {
            g.resize_widget($(widget));
        });

        g.generate_grid_and_stylesheet();
        g.generate_stylesheet({ namespace: '.gridster' });
        g.get_widgets_from_DOM();
        g.set_dom_grid_width();
        g.set_dom_grid_height();
    }

    function newGridster() {
        var $grid = $('.gridster-layout');
        $grid.removeData('gridster');
        $grid.html('');

        var gridster = $grid.gridster({
            max_cols: colsCount,
            min_cols: colsCount,
            autogenerate_stylesheet: false,
            widget_margins: [margin, margin],
            widget_base_dimensions: [baseWidth, baseHeight]
        }).data('gridster');
        gridster.disable();

        return gridster;
    }

    function bindGridEvents() {
        $(window).on('resize', reflowGridster);
    }

    bindGridEvents();
    newGridster();
    reflowGridster();

    /*
     * Navigation handling
     */

    function isPageValid(id) {
        return getPageById(id).length > 0;
    }

    function openHashLocation() {
        var hash = getHashPath().split('/');
        if (hash.length != 2) {
            return false;
        }
        if (!isPageValid(hash[1])) {
            return false;
        }
        openPage(hash[1]);
        return true;
    }

    function updateHashLocation() {
        var hash = '#/' + getId(getCurrentPage());
        if (Config.startingDate != undefined && Config.endingDate != undefined) {
            hash += '?' + Config.startingDate + ':' + Config.endingDate;
        }
        window.location.hash = hash;
    }

    function getId($item) {
        return $item.find('[name]').attr('name');
    }

    function getPageMenu() {
        return $('.header-menu');
    }

    function getFirstPage() {
        return getPageMenu().find('.header-menu__item:first');
    }

    function getCurrentPage() {
        return $('.header-menu__item--selected');
    }

    function getPageById(id) {
        return $('.header-menu a[name=' + id + ']').parent();
    }

    function removeCurrentPage() {
        getCurrentPage().removeClass('header-menu__item--selected');
    }

    function setCurrentPage(id) {
        removeCurrentPage();
        getPageById(id).addClass('header-menu__item--selected');
    }

    function openPage(id) {
        removeCurrentPage();
        setCurrentPage(id);
        addWidgets(newGridster(), Config.pages[id]);
        updateHashLocation();
    }

    function bindNavigationEvents() {
        $('.header-menu [name]').on('click', function () {
            openPage($(this).attr('name'));
        });
    }

    bindNavigationEvents();
    if (!openHashLocation()) {
        openPage(getId(getFirstPage()));
    }


    /*
     * Html handling
     */

    function buildUrl(id) {
        var ctx = "time:(from:'$from',mode:quick,to:'$to')"
                .replace('$from', Config.startingDate + 'T00:00:00.000Z')
                .replace('$to', Config.endingDate + 'T23:59:59.999Z');
        return Config.kibana.url + '#/visualize/edit/' + id + '?embed&_g=(' + ctx + ')';
    }

    function getWidgetHtml(widget) {
        return [
            '<li class="widget">',
            '  <div class="widget-title">' + widget.title + '</div>',
            '  <div class="widget-content">',
            '    <iframe src="' + buildUrl(widget.id) + '"></iframe>',
            '  </div>',
            '</li>'
        ].join("\n");
    }

    function addWidgets(gridster, widgets) {
        for (var i = 0; i < widgets.length; i++) {
            var w = widgets[i];
            gridster.add_widget(getWidgetHtml(w), w.sizex, w.sizey, w.col, w.row);
        }
    }

});
