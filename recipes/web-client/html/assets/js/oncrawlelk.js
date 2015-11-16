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
    var spacerCount = 30;
    var spacerSize = spacerCount * colsCount;

    function reflowGridster() {
        var $container = $('.content');
        var g = $container.find('> .gridster > ul').data('gridster');

        g.options.widget_margins = [spacerCount / 2, spacerCount];
        g.options.widget_base_dimensions = [($container.width() - spacerSize) / colsCount, 120];
        g.min_widget_width  = (g.options.widget_margins[0] * 2) + g.options.widget_base_dimensions[0];
        g.min_widget_height = (g.options.widget_margins[1] * 2) + g.options.widget_base_dimensions[1];
        g.$widgets.each(function (i, widget) {
            g.resize_widget($(widget));
        });

        g.generate_grid_and_stylesheet();
        g.generate_stylesheet({ namespace: '.gridster' });
        g.get_widgets_from_DOM();
    }

    function newGridster() {
        var $grid = $('.gridster-layout');
        $grid.removeData('gridster');
        $grid.html('');

        var gridster = $('.gridster-layout').gridster({
            max_cols: colsCount,
            min_cols: colsCount,
            autogenerate_stylesheet: false,
            widget_margins: [5, 5],
            widget_base_dimensions: [50, 50]
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

    function isCategoryValid(id) {
        return getCategory(id).length > 0;
    }

    function isPageValid(id) {
        return getPageById(id).length > 0;
    }

    function openHashLocation() {
        var hash = getHashPath().split('/');
        if (hash.length != 3) {
            return false;
        }
        if (!isCategoryValid(hash[1]) || !isPageValid(hash[2])) {
            return false;
        }
        openCategory(hash[1], hash[2]);
        return true;
    }

    function updateHashLocation() {
        var hash = '#/' + getId(getCurrentCategory()) + '/' + getId(getCurrentPage());
        if (Config.startingDate != undefined && Config.endingDate != undefined) {
            hash += '?' + Config.startingDate + ':' + Config.endingDate;
        }
        window.location.hash = hash;
    }

    function getId($item) {
        return $item.find('[name]').attr('name');
    }

    function getFirstPage() {
        return getCurrentCategoryMenu().find('.header-menu__item:first');
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

    function getFirstCategory() {
        return $('.header-top-menu__item:first');
    }

    function getCurrentCategory() {
        return $('.header-top-menu__item--selected');
    }

    function getCategory(id) {
        return $('.header-top-menu a[name=' + id + ']').parent();
    }

    function getCurrentCategoryMenu() {
        return $('.header-menu--selected');
    }

    function removeCurrentCategoryMenu() {
        getCurrentCategoryMenu().removeClass('header-menu--selected');
    }

    function removeCurrentCategory() {
        getCurrentCategory().removeClass('header-top-menu__item--selected');
    }

    function setCurrentCategory(id) {
        removeCurrentCategory();
        getCategory(id).addClass('header-top-menu__item--selected');
    }

    function getCategoryMenu(id) {
        return $('.header-menu--' + id);
    }

    function setCurrentCategoryMenu(id) {
        getCategoryMenu(id).addClass('header-menu--selected');
    }

    function openCategoryMenu(id) {
        removeCurrentCategoryMenu();
        setCurrentCategoryMenu(id);
    }

    function openCategory(id, pageId) {
        removeCurrentCategory();
        setCurrentCategory(id);
        openCategoryMenu(id);
        if (pageId == undefined) {
            pageId = getId(getFirstPage());
        }
        openPage(pageId);
    }

    function openPage(id) {
        removeCurrentPage();
        setCurrentPage(id);
        addWidgets(newGridster(), Config.pages[getId(getCurrentCategory()) + '/' + id]);
        updateHashLocation();
    }

    function bindNavigationEvents() {
        $('.header-top-menu [name]').on('click', function () {
            openCategory($(this).attr('name'));
        });
        $('.header-menu [name]').on('click', function () {
            openPage($(this).attr('name'));
        });
    }

    bindNavigationEvents();
    if (!openHashLocation()) {
        openCategory(getId(getFirstCategory()));
    }


    /*
     * Html handling
     */

    function buildUrl(id, params) {
        return Config.kibana.url +
                '#/visualize/edit/' + id + '?embed&' +
                params
                    .replace('$from', Config.startingDate + 'T00:00:00.000Z')
                    .replace('$to', Config.endingDate + 'T23:59:59.999Z');
    }

    function getWidgetHtml(widget) {
        return [
            '<li class="widget">',
            '  <div class="widget-title">',
            '    <span>' + widget.title + '</span>' +
            '  </div>' +
            '  <div class="widget-content">',
            '    <iframe src="' + buildUrl(widget.id, widget.params) + '"></iframe>',
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
