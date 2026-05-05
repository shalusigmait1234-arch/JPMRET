import Hero from '../models/Hero.js';


export const getHero = async (req, res) => {
  try {
    const heroes = await Hero.find({ isActive: true }).sort({ updatedAt: -1 });
    if (!heroes || heroes.length === 0) {
      return res.status(200).json([]); // Return empty array instead of 404
    }
    res.status(200).json(heroes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getAllHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ updatedAt: -1 });
    res.status(200).json(heroes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const createHero = async (req, res) => {
  try {
    const { title, subtitle, image, buttonText, buttonLink, isActive } = req.body;
    const hero = await Hero.create({
      title,
      subtitle,
      image,
      buttonText,
      buttonLink,
      isActive: isActive !== undefined ? isActive : true
    });
    res.status(201).json({
      success: true,
      message: 'Hero section created successfully',
      data: hero
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const updateHero = async (req, res) => {
  try {
    const { title, subtitle, image, buttonText, buttonLink, isActive } = req.body;
    const heroId = req.params.id;

    let hero;
    if (heroId) {
      hero = await Hero.findById(heroId);
    } else {
      hero = await Hero.findOne();
    }

    if (!hero) {
      return res.status(404).json({ message: 'Hero section not found' });
    }

    hero.title = title || hero.title;
    hero.subtitle = subtitle || hero.subtitle;
    hero.image = image || hero.image;
    hero.buttonText = buttonText || hero.buttonText;
    hero.buttonLink = buttonLink || hero.buttonLink;
    if (isActive !== undefined) hero.isActive = isActive;
    hero.updatedAt = Date.now();

    await hero.save();

    res.status(200).json({
      success: true,
      message: 'Hero section updated successfully',
      data: hero
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const deleteHero = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) {
      return res.status(404).json({ message: 'Hero section not found' });
    }
    await hero.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Hero section deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
