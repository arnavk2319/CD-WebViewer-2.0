'use strict';

import Lang from '../utils/lang.js';
import Array from '../utils/array.js';
import GridLayer from './gridLayer/auto.js';
import GridLayerConfig from './gridLayer/config.js';
import CellTrack from './cellTrack/auto.js';
import CellTrackConfig from './cellTrack/config.js';
import StateSum from './stateSum/auto.js';
import StateSumConfig from './stateSum/config.js';
import TransitionMap from './transitionMap/auto.js';
import TransitionMapConfig from './transitionMap/config.js';

let AUTOS = [{
		id : "gridLayer",
		nls : "Widget_AutoGrid",
		definition : GridLayer,
		configurator : GridLayerConfig
	}, {
		id : "cellTrack",
		nls : "Widget_AutoCellTrackChart",
		definition : CellTrack,
		configurator : CellTrackConfig
	}, {
		id : "stateSum",
		nls : "Widget_AutoStateChart",
		definition : StateSum,
		configurator : StateSumConfig
	}, {
		id : "transitionMap",
		nls : "Widget_AutoTransitionMap",
		definition : TransitionMap,
		configurator : TransitionMapConfig
	}];

export default class Auto { 

	static Widgets() {
		return AUTOS;
	}
	
	static Item(id) {
		return Array.Find(AUTOS, function(a) { return a.id === id; });
	}
	
	static Definition(id) {
		return this.Item(id).definition;
	}
	
	static Configurator(id) {
		return this.Item(id).configurator;
	}
	
	static Label(id) {
		return Lang.Nls(this.Item(id).nls);
	}
};