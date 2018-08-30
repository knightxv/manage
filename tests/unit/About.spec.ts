import { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';
import About from '@/pages/home/About.vue';

describe('About.vue', () => {
  it('renders about', () => {
    const AboutWrapper = mount(About);
    expect(AboutWrapper.find('h1').text()).to.include('This is an about page');
  });
});
