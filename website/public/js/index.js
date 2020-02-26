// const blobCursor = (() => {
//   const CURSOR = document.querySelector("#cursorBlob");
//   const LINKS = document.querySelectorAll("a");
//   // const TITLE = document.querySelectorAll('.botname');
//   const BTN = document.querySelectorAll("button");
//   const setCursorPos = e => {
//     const { pageX: posX, pageY: posY } = e;
//     CURSOR.style.top = `${posY - CURSOR.offsetHeight / 2}px`;
//     CURSOR.style.left = `${posX - CURSOR.offsetWidth / 2}px`;
//   };
//   document.addEventListener("mousemove", setCursorPos);

//   const setCursorHover = () => (CURSOR.style.transform = "scale(1.5)");
//   const removeCursorHover = () => (CURSOR.style.transform = "");
//   LINKS.forEach(link => link.addEventListener("mouseover", setCursorHover));
//   LINKS.forEach(link => link.addEventListener("mouseleave", removeCursorHover));
//   // TITLE.forEach(link => link.addEventListener('mouseover', setCursorHover));
//   // TITLE.forEach(link => link.addEventListener('mouseleave', removeCursorHover));
//   BTN.forEach(link => link.addEventListener("mouseover", setCursorHover));
//   BTN.forEach(link => link.addEventListener("mouseleave", removeCursorHover));
// })();

jQuery(document).ready(function() {
    jQuery('.placeholder').on('click', function(event) {
        const placeholder_list = event.target.parentNode.querySelector('.placeholder-list') 
        $(placeholder_list).toggle('show')
    });
});

const refreshModuleActivate = function (selector) {
    if ($(selector).is(':checked')) {
        $($(selector).attr('target')).css({
            opacity: '1',
            'pointer-events': 'auto'
        });
    } else {
        $($(selector).attr('target')).css({
            opacity: '.25',
            'pointer-events': 'none'
        });
    }
}

$(document).ready(function() {
    refreshModuleActivate('#send-punish-message')
    $('#send-punish-message').change(function() {
        refreshModuleActivate('#send-punish-message')
    });
});

$(document).ready(function() {
    refreshModuleActivate('#activate-automod')
    $('#activate-automod').change(function() {
        refreshModuleActivate('#activate-automod')
    });
});

$(document).ready(function() {
    refreshModuleActivate('#activate-mod')
    $('#activate-mod').change(function() {
        refreshModuleActivate('#activate-mod')
    });
});

$(document).ready(function() {
    refreshModuleActivate('#activate-send-message')
    $('#activate-send-message').change(function() {
        refreshModuleActivate('#activate-send-message')
    });
});

$(document).ready(function() {
    refreshModuleActivate('#activate-starboard')
    $('#activate-starboard').change(function() {
        refreshModuleActivate('#activate-starboard')
    });
});

$(document).ready(function() {
    refreshModuleActivate('#activate-block-invite')
    $('#activate-block-invite').change(function() {
        refreshModuleActivate('#activate-block-invite')
    });
});

$(document).ready(function() {
    refreshModuleActivate('#activate-wl-message')
    $('#activate-wl-message').change(function() {
        refreshModuleActivate('#activate-wl-message')
    });
});

$('#search-input').on('keyup', function() {
    var value = $(this)
        .val()
        .toLowerCase();
    $('#table tbody tr').filter(function() {
        $(this).toggle(
            $(this)
                .text()
                .toLowerCase()
                .indexOf(value) > -1
        );
    });
    if ($('#table tbody tr:visible').length === 0) {
        $('#notfound').show();
    } else {
        $('#notfound').hide();
    }
});

// Filter by buttons
// Activate current nav commands button
$('.cmd-btn-list').click(function() {
    $('.cmd-btn-list').each(function() {
        $(this).removeClass('cmd-btn-list-focus');
    });
    $(this).addClass('cmd-btn-list-focus');

    var id = $(this).attr('id');
    console.log(id);
    $('#table tbody tr').filter(function() {
        $(this).toggle(
            $(this)
                .attr('class')
                .indexOf(id) > -1
        );
    });
});

const icons = document.querySelectorAll('.icon');
icons.forEach(icon => {
    icon.addEventListener('click', event => {
        icon.classList.toggle('open');
    });
});

$('#select-role-btn').on('click', function(e) {
    const selected = $('select#select-role').children('option:selected');
    if (selected.attr('disabled')) return;

    const base = $('#selected-role-base').clone();
    base.attr('id', 'selected-role');
    base.css('display', 'inline-block');
    base.find(`[name="role-name"]`).text(selected.text());
    base.attr('data-role-id', selected.val());
    $('#selected-role-list').append(base);
    selected.attr('disabled', 'true');
});

$(document).on('click', '#delete-selected-role', function() {
    const roleId = $(this)
        .closest('#selected-role')
        .attr('data-role-id');
    const option = $('select#select-role').children(
        `option[value="${roleId}"]`
    );
    option.removeAttr('disabled');
    $('#selected-role-list')
        .children(`#selected-role[data-role-id="${roleId}"]`)
        .remove();
});

$('#select-channel-btn').on('click', function(e) {
    const selected = $('select#select-channel').children('option:selected');
    if (selected.attr('disabled')) return;

    const base = $('#selected-channel-base').clone();
    base.attr('id', 'selected-channel');
    base.css('display', 'inline-block');
    base.find(`[name="channel-name"]`).text(selected.text());
    base.attr('data-channel-id', selected.val());
    $('#selected-channel-list').append(base);
    selected.attr('disabled', 'true');
});

$(document).on('click', '#delete-selected-channel', function() {
    const channelId = $(this)
        .closest('#selected-channel')
        .attr('data-channel-id');
    const option = $('select#select-channel').children(
        `option[value="${channelId}"]`
    );
    option.removeAttr('disabled');
    $('#selected-channel-list')
        .children(`#selected-channel[data-channel-id="${channelId}"]`)
        .remove();
});
$('#select-allowed-channel-btn').on('click', function(e) {
    const selected = $('select#select-allowed-channel').children('option:selected');
    if (selected.attr('disabled')) return;

    const base = $('#selected-allowed-channel-base').clone();
    base.attr('id', 'selected-allowed-channel');
    base.css('display', 'inline-block');
    base.find(`[name="channel-name"]`).text(selected.text());
    base.attr('data-channel-id', selected.val());
    $('#selected-allowed-channel-list').append(base);
    selected.attr('disabled', 'true');
});

$(document).on('click', '#delete-selected-allowed-channel', function() {
    const channelId = $(this)
        .closest('#selected-allowed-channel')
        .attr('data-channel-id');
    const option = $('select#select-allowed-channel').children(
        `option[value="${channelId}"]`
    );
    option.removeAttr('disabled');
    $('#selected-allowed-channel-list')
        .children(`#selected-allowed-channel[data-channel-id="${channelId}"]`)
        .remove();
});

$(function() {
    function getRoles() {
        const roleList = document.getElementById('selected-role-list');
        const children = roleList.childNodes;
        const roles = [];
        for (var i = 0; i < children.length; i++) {
            const node = children[i];
            if (node.nodeType == Node.TEXT_NODE) continue;

            var id = node.getAttribute('data-role-id');
            if (!id) continue;

            roles.push(id);
        }

        return roles;
    }

    function getCommandChannels() {
        const channelList = document.getElementById('selected-channel-list');
        const children = channelList.childNodes;
        const channels = [];
        for (var i = 0; i < children.length; i++) {
            const node = children[i];
            if (node.nodeType == Node.TEXT_NODE) continue;

            var id = node.getAttribute('data-channel-id');
            if (!id) continue;

            channels.push(id);
        }

        return channels;
    }

    function getAllowedChannel() {
        const channelList = document.getElementById('selected-allowed-channel-list');
        const children = channelList.childNodes;
        const channels = [];
        for (var i = 0; i < children.length; i++) {
            const node = children[i];
            if (node.nodeType == Node.TEXT_NODE) continue;

            var id = node.getAttribute('data-channel-id');
            if (!id) continue;

            channels.push(id);
        }

        return channels;
    }

    $('#save').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: window.location.toString(),
            data: {
                prefix: $('#prefix').val(),
                config: {
                    deleteMessage: $('#delete-message-after-command').is(
                        ':checked'
                    ),
                    forbiddenChannelMsg: $('#warn-if-blacklisted').is(
                        ':checked'
                    ),
                    messages: {
                        enabled: $('#activate-wl-message').is(':checked'),
                        welcome: {
                            enabled: $('#activate-welcome-message').is(
                                ':checked'
                            ),
                            channel: $('#select-welcome-channel').val(),
                            message: $('#welcome-message').val()
                        },
                        leave: {
                            enabled: $('#activate-leave-message').is(
                                ':checked'
                            ),
                            channel: $('#select-leave-channel').val(),
                            message: $('#leave-message').val()
                        }
                    },
                    antiInvite: {
                        enabled: $('#activate-block-invite').is(':checked'),
                        allowedChannels: getAllowedChannel(),
                        allowGuildInvites: $('#activate-allow-invites').is(':checked'),
                        blockMessage: $('#anti-invite-message').val(),
                        sendMessage: $('#activate-send-message').is(':checked'),
                        deleteInvite: $('#activate-delete-invites').is(':checked')
                    },
                    starBoard: {
                        enabled: $('#activate-starboard').is(':checked'),
                        starChannel: $('#select-starboard-channel').val(),
                        minStars: $('#select-starboard-min').val()
                    },
                    moderation: {
                        enabled: $('#activate-mod').is(':checked'),
                        sendMessage: $('#send-punish-message').is(':checked'),
                        punishMessage: $('#punish-message').val(),
                        autoMod: {
                            enabled: $('#activate-automod').is(':checked')
                        },
                    },
                    cmdChannels: getCommandChannels(),
                    botName: $('#botName').val(),
                    role: {
                        adminRole: $('#set-admin-role').is(':checked'),
                        modRole: $('#set-mod-role').is(':checked'),
                        djRole: $('#set-dj-role').is(':checked')
                    },
                    autoRole: {
                        enabled: $('#activate-autorole').is(':checked'),
                        roles: getRoles(),
                    },
                }
            },
            success: function(data) {
                if (data.status === 'ok') {
                    Swal.fire({
                        icon: 'success',
                        text: 'As configurações foram salvas!',
                        allowOutsideClick: false,
                        showConfirmButton: true
                    });
                }
            },
            error: function(xhr, status, error) {
                console.log('Deu errado =(');
                console.log('XHR:', xhr);
                console.log('Status: ' + status, error);
            }
        });
    });
});
