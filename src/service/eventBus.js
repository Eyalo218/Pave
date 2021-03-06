export const LOGGED_IN = 'logged-in';
export const LOGGED_OUT = 'logged-out';
export const PHOTO_TAKEN = 'photo-taken';
export const MARKER_ADDED = 'marker-added';
export const EMIT_SEARCH = 'emit-search';
export const CHANGE_MARKER = 'change-marker';
export const SET_TRIP_PHOTOS = 'set-trip-photos';
export const MARKER_CLICKED = 'marker-clicked';
export const OPEN_EXPLORE = 'open-explore';
export const CLOSE_EXPLORE = 'close-explore';
export const PIN_ADDED = 'pin-added';
export const CLOSE_CAMERA = 'close-explore';
export const OPEN_EXPLORE_ACTIVE = 'open-explore-active';
export const OPEN_EXPLORE_SORTED = 'open-explore-sorted';
export const PINNED_TRIP = 'PINNED_TRIP';

import Vue from 'vue';
export const eventBus = new Vue();