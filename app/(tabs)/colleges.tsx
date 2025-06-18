import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, LayoutChangeEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { TabBar } from 'react-native-tab-view';

import { Colors } from '@/constants/Colors';

type College = {
    id: string;
    name: string;
    location: string;
    logoUrl: string;
};

const curatedCollegesData: College[] = [
    { 
        id: '1', 
        name: 'Duke University', 
        location: 'Durham, NC', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Duke_Athletics_logo.svg/1200px-Duke_Athletics_logo.svg.png' 
    },
    { 
        id: '2', 
        name: 'Massachusetts Institute of Technology', 
        location: 'Cambridge, MA', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/MIT_Seal.svg/240px-MIT_Seal.svg.png' 
    },
    { 
        id: '3', 
        name: 'Stanford University', 
        location: 'Stanford, CA', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Stanford_University_seal_2003.svg/1200px-Stanford_University_seal_2003.svg.png' 
    },
    { 
        id: '4', 
        name: 'University of Pennsylvania', 
        location: 'Philadelphia, PA', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Shield_of_the_University_of_Pennsylvania.svg/1200px-Shield_of_the_University_of_Pennsylvania.svg.png' 
    },
    { 
        id: '5', 
        name: 'Princeton University', 
        location: 'Princeton, NJ', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/1200px-Princeton_seal.svg.png' 
    },
    { 
        id: '6', 
        name: 'Columbia University', 
        location: 'New York, NY', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Columbia_University_Seal.svg/1200px-Columbia_University_Seal.svg.png'
    },
    { 
        id: '7', 
        name: 'University of Chicago', 
        location: 'Chicago, IL', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/UChicago_Veritas_Logo.svg/1200px-UChicago_Veritas_Logo.svg.png'
    },
    { 
        id: '8', 
        name: 'Yale University', 
        location: 'New Haven, CT', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield.svg/1200px-Yale_University_Shield.svg.png'
    },
    { 
        id: '9', 
        name: 'Cornell University', 
        location: 'Ithaca, NY', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1200px-Cornell_University_seal.svg.png'
    },
    { 
        id: '10', 
        name: 'Brown University', 
        location: 'Providence, RI', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Brown_University_coat_of_arms.svg/1200px-Brown_University_coat_of_arms.svg.png'
    },
];

const omittedCollegesData: College[] = [
    { 
        id: '11', 
        name: 'Harvard University', 
        location: 'Cambridge, MA', 
        logoUrl: '' // URL not needed for omitted list
    },
    { id: '12', name: 'University of California, Berkeley', location: 'Berkeley, CA', logoUrl: '' },
    { id: '13', name: 'University of Michigan', location: 'Ann Arbor, MI', logoUrl: '' },
    { id: '14', name: 'New York University', location: 'New York, NY', logoUrl: '' },
    { id: '15', name: 'University of Southern California', location: 'Los Angeles, CA', logoUrl: '' },
    { id: '16', name: 'Carnegie Mellon University', location: 'Pittsburgh, PA', logoUrl: '' },
    { id: '17', name: 'Georgetown University', location: 'Washington, D.C.', logoUrl: '' },
    { id: '18', name: 'University of Virginia', location: 'Charlottesville, VA', logoUrl: '' },
    { id: '19', name: 'Tufts University', location: 'Medford, MA', logoUrl: '' },
    { id: '20', name: 'University of North Carolina at Chapel Hill', location: 'Chapel Hill, NC', logoUrl: '' },
];

const StrategyItem = ({ type, colleges }: { type: string; colleges: string[] }) => (
    <View style={styles.strategyItem}>
        <Text style={styles.strategyType}>{type}</Text>
        <Text style={styles.strategyColleges}>{colleges.join(', ')}</Text>
    </View>
);

const SummaryContent = ({ onLayout }: { onLayout: (event: LayoutChangeEvent) => void }) => (
  <View onLayout={onLayout} style={styles.contentContainer}>
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="school-outline" size={24} color={Colors.light.text} />
        <Text style={styles.cardTitle}>Total Colleges: 10</Text>
      </View>
      <Text style={styles.cardSubtitle}>3 Safe, 4 Target, 3 Reach</Text>
      <View style={styles.separator} />
      <View style={styles.strategyContainer}>
        <Text style={styles.strategyTitle}>Application Strategy</Text>
        <StrategyItem type="Early Decision (ED1)" colleges={['Duke University']} />
        <StrategyItem type="Early Decision (ED2)" colleges={['Emory University']} />
        <StrategyItem type="Early Action (EA)" colleges={['MIT', 'USC', 'Northeastern University', 'Rutgers University - New Brunswick']} />
        <StrategyItem type="Regular Decision (RD)" colleges={['NYU', 'Case Western Reserve', 'Santa Clara University', 'Pepperdine University']} />
      </View>
    </View>
  </View>
);

const CollegeCard = ({ college }: { college: College }) => (
    <View style={styles.card}>
        <View style={styles.collegeCardHeader}>
            <Image 
                source={{ uri: college.logoUrl }}
                style={styles.collegeLogo}
            />
            <View style={styles.collegeInfoContainer}>
                <Text style={styles.collegeName}>{college.name}</Text>
                <Text style={styles.collegeLocation}>{college.location}</Text>
            </View>
            <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={24} color={Colors.light.secondaryText} />
            </TouchableOpacity>
        </View>
        {/* Add more college details here based on the design */}
    </View>
);

const CuratedContent = ({ onLayout }: { onLayout: (event: LayoutChangeEvent) => void }) => (
    <View onLayout={onLayout} style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Curated College List</Text>
      {curatedCollegesData.map(college => <CollegeCard key={college.id} college={college}/>)}
    </View>
);

const OmittedContent = ({ onLayout }: { onLayout: (event: LayoutChangeEvent) => void }) => (
    <View onLayout={onLayout} style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Omitted</Text>
        <View style={styles.card}>
            {omittedCollegesData.map((college, index) => (
                <View key={college.id}>
                    <Text style={styles.omittedCollegeName}>{college.name}</Text>
                    {index < omittedCollegesData.length - 1 && <View style={styles.separator} />}
                </View>
            ))}
        </View>
    </View>
);


export default function CollegesScreen() {
    const { width } = useWindowDimensions();
    const scrollViewRef = useRef<ScrollView>(null);
    const sectionLayouts = useRef<{ [key: string]: number }>({}).current;
    const isTabPressScroll = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    const [navigationState, setNavigationState] = useState({
        index: 0,
        routes: [
          { key: 'summary', title: 'Summary' },
          { key: 'curated', title: 'Curated College List' },
          { key: 'omitted', title: 'Omitted' },
        ],
    });
    
    const position = useRef(new Animated.Value(navigationState.index)).current;

    useEffect(() => {
        Animated.timing(position, {
          toValue: navigationState.index,
          duration: 250,
          useNativeDriver: false,
        }).start();
      }, [navigationState.index, position]);

    const handleLayout = (key: string, event: LayoutChangeEvent) => {
        // Adding a small offset to the layout Y position
        sectionLayouts[key] = event.nativeEvent.layout.y - 60;
    };

    const jumpTo = (key: string) => {
        const index = navigationState.routes.findIndex(r => r.key === key);
        if (index === -1) return;

        const y = sectionLayouts[key];

        if (scrollViewRef.current && y !== undefined) {
            isTabPressScroll.current = true;
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

            setNavigationState({ ...navigationState, index });
            scrollViewRef.current.scrollTo({ y, animated: true });

            scrollTimeout.current = setTimeout(() => {
                isTabPressScroll.current = false;
            }, 1000); 
        }
    };

    const handleScroll = (event: { nativeEvent: { contentOffset: { y: number } } }) => {
        if (isTabPressScroll.current) return;
        
        const scrollY = event.nativeEvent.contentOffset.y;
        let newIndex = 0;

        const sortedRoutes = [...navigationState.routes].sort((a, b) => (sectionLayouts[a.key] ?? 0) - (sectionLayouts[b.key] ?? 0));

        for (let i = 0; i < sortedRoutes.length; i++) {
            const route = sortedRoutes[i];
            const routeY = sectionLayouts[route.key];
            if (routeY !== undefined && scrollY >= routeY - 50) { 
                newIndex = navigationState.routes.findIndex(r => r.key === route.key);
            }
        }
        
        if (newIndex !== navigationState.index) {
            setNavigationState({ ...navigationState, index: newIndex });
        }
    };

    return (
        <View style={styles.container}>
             <View style={styles.header}>
                 <Text style={styles.title}>College List Builder</Text>
             </View>
             <TabBar
                position={position}
                navigationState={navigationState}
                jumpTo={jumpTo}
                layout={{ width, height: 0 }}
                scrollEnabled
                indicatorStyle={{ backgroundColor: Colors.light.tint, height: 3 }}
                style={{ backgroundColor: Colors.light.background, borderBottomWidth: 1, borderBottomColor: Colors.light.progressBackground }}
                tabStyle={styles.tabLabel}
                activeColor={Colors.light.tint}
                inactiveColor={Colors.light.secondaryText}
                bounces={true}
            />
            <ScrollView
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                <SummaryContent onLayout={(e) => handleLayout('summary', e)} />
                <CuratedContent onLayout={(e) => handleLayout('curated', e)} />
                <OmittedContent onLayout={(e) => handleLayout('omitted', e)} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
   header: {
     paddingHorizontal: 16,
     paddingTop: 16,
     paddingBottom: 8
   },
   title: {
     fontSize: 24,
     fontWeight: 'bold',
     color: Colors.light.text,
   },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginLeft: 12,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    marginLeft: 36, // Align with title text
  },
  separator: {
    height: 1,
    backgroundColor: Colors.light.progressBackground,
    marginVertical: 16,
  },
  strategyContainer: {},
  strategyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  strategyItem: {
    marginBottom: 12,
  },
  strategyType: {
    fontSize: 14,
    color: Colors.light.secondaryText,
  },
  strategyColleges: {
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 24,
    marginTop: 4,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
    paddingHorizontal: 4,
  },
  collegeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collegeLogo: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors.light.progressBackground
  },
  collegeInfoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  collegeName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  collegeLocation: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    marginTop: 2,
  },
  omittedCollegeName: {
      fontSize: 16,
      color: Colors.light.text,
      paddingVertical: 12,
  }
}); 