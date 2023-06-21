import ContextWrapper from '@/global/context';
import SubComp from './Comp/SubComp';





const TopLabel = () => {
  return (
    <ContextWrapper>
    <div className='overflow-hidden border-b text-gray-100 bg-gray-700'>

        <div className="px-4 max-w-7xl mx-auto flex justify-between items-center">
            <div>
                <p><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&vCenter=true&width=435&lines=Unleash+your+style%2C+shop+now;Step+into+fashion's+vibrant+world;Discover+trends+that+ignite+confidence;Elevate+your+wardrobe+with+elegance;Embrace+the+perfect+fit+today" alt="Typing SVG" /></p>
            </div>

                <SubComp/>

        </div>




    </div>
    
    </ContextWrapper>
  )
}

export default TopLabel