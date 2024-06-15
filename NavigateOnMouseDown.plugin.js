/**
 * @name NavigateOnMouseDown
 * @version 1.0
 * @description Navigate On Mouse Down
 * @author Tony
 * @source https://github.com/Legend-Master/discord-navigate-on-mouse-down
 */

// @ts-check

/**
 * @param {MouseEvent} event
 */
function onMouseDown(event) {
	// Only left / primary
	if (event.button !== 0) {
		return
	}
	if (!(event.target instanceof Element)) {
		return
	}
	const target =
		event.target instanceof HTMLElement
			? event.target
			: event.target.parentElement instanceof HTMLElement
			? event.target.parentElement
			: undefined
	if (!target) {
		return
	}
	if (
		// Channel
		// `a[data-list-item-id*="channels__"][href]`: channel but not voice channel
		// `a[data-list-item-id*="private-channels"]`: direct message
		// `div[data-list-item-id*="channels__"]`: thread
		target.matches(
			':is(a[data-list-item-id*="channels__"][href], a[data-list-item-id*="private-channels"], div[data-list-item-id*="channels__"])'
		) ||
		target.matches(
			':is(a[data-list-item-id*="channels__"][href], a[data-list-item-id*="private-channels"], div[data-list-item-id*="channels__"]) *:not([role="button"])'
		) ||
		// Server
		target.dataset.listItemId?.startsWith('guildsnav__')
	) {
		target.click()
	}
}

function start() {
	document.addEventListener('mousedown', onMouseDown)
}

function stop() {
	document.removeEventListener('mousedown', onMouseDown)
}

module.exports = () => ({
	start,
	stop,
})
