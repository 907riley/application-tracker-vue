import { mount } from "@vue/test-utils";
import SideBar from '../SideBar.vue'
import { it } from "vitest";
import { expect } from "vitest";

const wrapper = mount(SideBar)
const innerWrapper = wrapper.findComponent('aside')

it('checking to see if sidebar button exists', async () => {
    expect(innerWrapper.find('.menu-toggle-wrap').find('button').exists()).toBe(true)
});

it('checking to see if button changes var', async () => {
    const button = innerWrapper.find('.menu-toggle-wrap').find('button')
    expect(wrapper.findComponent('.is_expanded').exists()).toBe(false)

    await button.trigger('click')

    expect(wrapper.findComponent('.is_expanded').exists()).toBe(true)
});