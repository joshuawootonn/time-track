/********************************************************************************
** Form generated from reading UI file 'mainform.ui'
**
** Created by: Qt User Interface Compiler version 5.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINFORM_H
#define UI_MAINFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QCheckBox>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QGroupBox>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QRadioButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QStackedWidget>
#include <QtWidgets/QTabWidget>
#include <QtWidgets/QTableView>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainForm
{
public:
    QGridLayout *_2;
    QStackedWidget *mainStack;
    QWidget *basicPage;
    QGridLayout *gridLayout_2;
    QSpacerItem *horizontalSpacer_3;
    QSpacerItem *horizontalSpacer_2;
    QSpacerItem *verticalSpacer;
    QSpacerItem *verticalSpacer_2;
    QVBoxLayout *verticalLayout;
    QPushButton *basicPageClockIn;
    QPushButton *basicPageClockOut;
    QPushButton *basicPageAdvanced;
    QWidget *advPage;
    QGridLayout *gridLayout_7;
    QTabWidget *MainTabs;
    QWidget *EmployeeTab;
    QGridLayout *gridLayout_4;
    QTableView *EmployeeView;
    QWidget *ProjectTab;
    QGridLayout *gridLayout_5;
    QHBoxLayout *horizontalLayout_11;
    QTableView *ProjectView;
    QGridLayout *gridLayout_11;
    QTableView *ProjectView1;
    QWidget *ItemTab;
    QGridLayout *gridLayout_6;
    QTableView *ItemView;
    QWidget *ShiftTab;
    QGridLayout *gridLayout_3;
    QTableView *ShiftView;
    QHBoxLayout *horizontalLayout_4;
    QPushButton *pushButton_4;
    QPushButton *pushButton_3;
    QLineEdit *lineEdit;
    QTabWidget *HeaderTabs;
    QWidget *EmployeeSettings;
    QHBoxLayout *horizontalLayout_2;
    QGroupBox *groupBox;
    QHBoxLayout *horizontalLayout_5;
    QPushButton *EmployeeAdd;
    QPushButton *EmployeeArchive;
    QPushButton *EmployeeDelete;
    QGroupBox *groupBox_2;
    QGridLayout *gridLayout_8;
    QCheckBox *EmployeeName;
    QCheckBox *EmployeeActive;
    QCheckBox *EmployeeShiftCount;
    QCheckBox *EmployeeAdminStatus;
    QCheckBox *EmployeePin;
    QCheckBox *EmployeeId;
    QCheckBox *EmployeeCurrent;
    QGroupBox *groupBox_3;
    QVBoxLayout *verticalLayout_2;
    QRadioButton *AllRadio;
    QRadioButton *CurrentRadio;
    QRadioButton *PastRadio;
    QSpacerItem *horizontalSpacer_4;
    QWidget *ProjectsSettings;
    QHBoxLayout *horizontalLayout_7;
    QGroupBox *groupBox_6;
    QHBoxLayout *horizontalLayout_9;
    QPushButton *ProjectAdd;
    QPushButton *ProjectDelete;
    QPushButton *ProjectArchive;
    QGroupBox *groupBox_8;
    QGridLayout *gridLayout_9;
    QCheckBox *ProjectName;
    QCheckBox *ProjectId;
    QCheckBox *ProjectCurrent;
    QGroupBox *groupBox_9;
    QVBoxLayout *verticalLayout_3;
    QRadioButton *ProjectAllRadio;
    QRadioButton *ProjectCurrentRadio;
    QRadioButton *ProjectPastRadio;
    QSpacerItem *horizontalSpacer_6;
    QWidget *ItemsSettings;
    QHBoxLayout *horizontalLayout_8;
    QGroupBox *groupBox_7;
    QHBoxLayout *horizontalLayout_10;
    QPushButton *ItemAdd;
    QPushButton *ItemDelete;
    QGroupBox *groupBox_10;
    QGridLayout *gridLayout_10;
    QCheckBox *ItemName;
    QCheckBox *ItemId;
    QCheckBox *ItemSub;
    QCheckBox *ItemCategory;
    QCheckBox *ItemDimension;
    QSpacerItem *horizontalSpacer_7;
    QWidget *ShiftSettings;
    QHBoxLayout *horizontalLayout_3;
    QGroupBox *groupBox_4;
    QHBoxLayout *horizontalLayout_6;
    QPushButton *ShiftAdd;
    QPushButton *ShiftEdit;
    QPushButton *ShiftDelete;
    QGroupBox *groupBox_5;
    QGridLayout *gridLayout;
    QRadioButton *ShiftProjectRadio;
    QComboBox *ShiftItemCombo;
    QRadioButton *ShiftEmployeeRadio;
    QComboBox *ShiftEmployeeCombo;
    QRadioButton *ShiftItemRadio;
    QComboBox *ShiftProjectCombo;
    QSpacerItem *horizontalSpacer_5;
    QHBoxLayout *horizontalLayout;
    QSpacerItem *horizontalSpacer;
    QPushButton *mainFinish;

    void setupUi(QWidget *MainForm)
    {
        if (MainForm->objectName().isEmpty())
            MainForm->setObjectName(QStringLiteral("MainForm"));
        MainForm->resize(1162, 744);
        QFont font;
        font.setFamily(QStringLiteral("Calibri"));
        font.setPointSize(11);
        MainForm->setFont(font);
        _2 = new QGridLayout(MainForm);
        _2->setObjectName(QStringLiteral("_2"));
        mainStack = new QStackedWidget(MainForm);
        mainStack->setObjectName(QStringLiteral("mainStack"));
        mainStack->setFrameShape(QFrame::NoFrame);
        mainStack->setFrameShadow(QFrame::Plain);
        basicPage = new QWidget();
        basicPage->setObjectName(QStringLiteral("basicPage"));
        gridLayout_2 = new QGridLayout(basicPage);
        gridLayout_2->setObjectName(QStringLiteral("gridLayout_2"));
        horizontalSpacer_3 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        gridLayout_2->addItem(horizontalSpacer_3, 1, 2, 1, 1);

        horizontalSpacer_2 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        gridLayout_2->addItem(horizontalSpacer_2, 1, 0, 1, 1);

        verticalSpacer = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        gridLayout_2->addItem(verticalSpacer, 0, 1, 1, 1);

        verticalSpacer_2 = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        gridLayout_2->addItem(verticalSpacer_2, 2, 1, 1, 1);

        verticalLayout = new QVBoxLayout();
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        basicPageClockIn = new QPushButton(basicPage);
        basicPageClockIn->setObjectName(QStringLiteral("basicPageClockIn"));

        verticalLayout->addWidget(basicPageClockIn);

        basicPageClockOut = new QPushButton(basicPage);
        basicPageClockOut->setObjectName(QStringLiteral("basicPageClockOut"));

        verticalLayout->addWidget(basicPageClockOut);

        basicPageAdvanced = new QPushButton(basicPage);
        basicPageAdvanced->setObjectName(QStringLiteral("basicPageAdvanced"));

        verticalLayout->addWidget(basicPageAdvanced);


        gridLayout_2->addLayout(verticalLayout, 1, 1, 1, 1);

        mainStack->addWidget(basicPage);
        advPage = new QWidget();
        advPage->setObjectName(QStringLiteral("advPage"));
        advPage->setAcceptDrops(false);
        gridLayout_7 = new QGridLayout(advPage);
        gridLayout_7->setObjectName(QStringLiteral("gridLayout_7"));
        MainTabs = new QTabWidget(advPage);
        MainTabs->setObjectName(QStringLiteral("MainTabs"));
        MainTabs->setTabPosition(QTabWidget::South);
        EmployeeTab = new QWidget();
        EmployeeTab->setObjectName(QStringLiteral("EmployeeTab"));
        gridLayout_4 = new QGridLayout(EmployeeTab);
        gridLayout_4->setObjectName(QStringLiteral("gridLayout_4"));
        EmployeeView = new QTableView(EmployeeTab);
        EmployeeView->setObjectName(QStringLiteral("EmployeeView"));
        EmployeeView->setFrameShape(QFrame::NoFrame);
        EmployeeView->setGridStyle(Qt::SolidLine);

        gridLayout_4->addWidget(EmployeeView, 0, 0, 1, 1);

        MainTabs->addTab(EmployeeTab, QString());
        ProjectTab = new QWidget();
        ProjectTab->setObjectName(QStringLiteral("ProjectTab"));
        gridLayout_5 = new QGridLayout(ProjectTab);
        gridLayout_5->setObjectName(QStringLiteral("gridLayout_5"));
        horizontalLayout_11 = new QHBoxLayout();
        horizontalLayout_11->setObjectName(QStringLiteral("horizontalLayout_11"));
        ProjectView = new QTableView(ProjectTab);
        ProjectView->setObjectName(QStringLiteral("ProjectView"));
        ProjectView->setFrameShape(QFrame::NoFrame);

        horizontalLayout_11->addWidget(ProjectView);

        gridLayout_11 = new QGridLayout();
        gridLayout_11->setObjectName(QStringLiteral("gridLayout_11"));
        ProjectView1 = new QTableView(ProjectTab);
        ProjectView1->setObjectName(QStringLiteral("ProjectView1"));
        ProjectView1->setFrameShape(QFrame::NoFrame);

        gridLayout_11->addWidget(ProjectView1, 0, 0, 1, 1);


        horizontalLayout_11->addLayout(gridLayout_11);


        gridLayout_5->addLayout(horizontalLayout_11, 0, 0, 1, 1);

        MainTabs->addTab(ProjectTab, QString());
        ItemTab = new QWidget();
        ItemTab->setObjectName(QStringLiteral("ItemTab"));
        gridLayout_6 = new QGridLayout(ItemTab);
        gridLayout_6->setObjectName(QStringLiteral("gridLayout_6"));
        ItemView = new QTableView(ItemTab);
        ItemView->setObjectName(QStringLiteral("ItemView"));
        ItemView->setFrameShape(QFrame::NoFrame);

        gridLayout_6->addWidget(ItemView, 0, 0, 1, 1);

        MainTabs->addTab(ItemTab, QString());
        ShiftTab = new QWidget();
        ShiftTab->setObjectName(QStringLiteral("ShiftTab"));
        gridLayout_3 = new QGridLayout(ShiftTab);
        gridLayout_3->setObjectName(QStringLiteral("gridLayout_3"));
        gridLayout_3->setSizeConstraint(QLayout::SetMinimumSize);
        ShiftView = new QTableView(ShiftTab);
        ShiftView->setObjectName(QStringLiteral("ShiftView"));
        ShiftView->setFrameShape(QFrame::NoFrame);

        gridLayout_3->addWidget(ShiftView, 0, 0, 1, 1);

        MainTabs->addTab(ShiftTab, QString());

        gridLayout_7->addWidget(MainTabs, 3, 0, 1, 1);

        horizontalLayout_4 = new QHBoxLayout();
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));
        pushButton_4 = new QPushButton(advPage);
        pushButton_4->setObjectName(QStringLiteral("pushButton_4"));

        horizontalLayout_4->addWidget(pushButton_4);

        pushButton_3 = new QPushButton(advPage);
        pushButton_3->setObjectName(QStringLiteral("pushButton_3"));

        horizontalLayout_4->addWidget(pushButton_3);

        lineEdit = new QLineEdit(advPage);
        lineEdit->setObjectName(QStringLiteral("lineEdit"));

        horizontalLayout_4->addWidget(lineEdit);


        gridLayout_7->addLayout(horizontalLayout_4, 2, 0, 1, 1);

        HeaderTabs = new QTabWidget(advPage);
        HeaderTabs->setObjectName(QStringLiteral("HeaderTabs"));
        HeaderTabs->setMaximumSize(QSize(16777215, 110));
        EmployeeSettings = new QWidget();
        EmployeeSettings->setObjectName(QStringLiteral("EmployeeSettings"));
        horizontalLayout_2 = new QHBoxLayout(EmployeeSettings);
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        horizontalLayout_2->setContentsMargins(-1, 2, -1, 2);
        groupBox = new QGroupBox(EmployeeSettings);
        groupBox->setObjectName(QStringLiteral("groupBox"));
        groupBox->setMinimumSize(QSize(200, 0));
        groupBox->setMaximumSize(QSize(200, 16777215));
        horizontalLayout_5 = new QHBoxLayout(groupBox);
        horizontalLayout_5->setObjectName(QStringLiteral("horizontalLayout_5"));
        horizontalLayout_5->setContentsMargins(10, 0, 10, 0);
        EmployeeAdd = new QPushButton(groupBox);
        EmployeeAdd->setObjectName(QStringLiteral("EmployeeAdd"));

        horizontalLayout_5->addWidget(EmployeeAdd);

        EmployeeArchive = new QPushButton(groupBox);
        EmployeeArchive->setObjectName(QStringLiteral("EmployeeArchive"));

        horizontalLayout_5->addWidget(EmployeeArchive);

        EmployeeDelete = new QPushButton(groupBox);
        EmployeeDelete->setObjectName(QStringLiteral("EmployeeDelete"));

        horizontalLayout_5->addWidget(EmployeeDelete);


        horizontalLayout_2->addWidget(groupBox);

        groupBox_2 = new QGroupBox(EmployeeSettings);
        groupBox_2->setObjectName(QStringLiteral("groupBox_2"));
        gridLayout_8 = new QGridLayout(groupBox_2);
        gridLayout_8->setSpacing(2);
        gridLayout_8->setObjectName(QStringLiteral("gridLayout_8"));
        gridLayout_8->setContentsMargins(-1, 0, -1, 4);
        EmployeeName = new QCheckBox(groupBox_2);
        EmployeeName->setObjectName(QStringLiteral("EmployeeName"));

        gridLayout_8->addWidget(EmployeeName, 0, 0, 1, 1);

        EmployeeActive = new QCheckBox(groupBox_2);
        EmployeeActive->setObjectName(QStringLiteral("EmployeeActive"));

        gridLayout_8->addWidget(EmployeeActive, 1, 2, 1, 1);

        EmployeeShiftCount = new QCheckBox(groupBox_2);
        EmployeeShiftCount->setObjectName(QStringLiteral("EmployeeShiftCount"));

        gridLayout_8->addWidget(EmployeeShiftCount, 0, 2, 1, 1);

        EmployeeAdminStatus = new QCheckBox(groupBox_2);
        EmployeeAdminStatus->setObjectName(QStringLiteral("EmployeeAdminStatus"));

        gridLayout_8->addWidget(EmployeeAdminStatus, 1, 1, 1, 1);

        EmployeePin = new QCheckBox(groupBox_2);
        EmployeePin->setObjectName(QStringLiteral("EmployeePin"));

        gridLayout_8->addWidget(EmployeePin, 0, 1, 1, 1);

        EmployeeId = new QCheckBox(groupBox_2);
        EmployeeId->setObjectName(QStringLiteral("EmployeeId"));

        gridLayout_8->addWidget(EmployeeId, 1, 0, 1, 1);

        EmployeeCurrent = new QCheckBox(groupBox_2);
        EmployeeCurrent->setObjectName(QStringLiteral("EmployeeCurrent"));

        gridLayout_8->addWidget(EmployeeCurrent, 0, 3, 1, 1);


        horizontalLayout_2->addWidget(groupBox_2);

        groupBox_3 = new QGroupBox(EmployeeSettings);
        groupBox_3->setObjectName(QStringLiteral("groupBox_3"));
        verticalLayout_2 = new QVBoxLayout(groupBox_3);
        verticalLayout_2->setSpacing(2);
        verticalLayout_2->setObjectName(QStringLiteral("verticalLayout_2"));
        verticalLayout_2->setContentsMargins(6, 0, 6, 6);
        AllRadio = new QRadioButton(groupBox_3);
        AllRadio->setObjectName(QStringLiteral("AllRadio"));

        verticalLayout_2->addWidget(AllRadio);

        CurrentRadio = new QRadioButton(groupBox_3);
        CurrentRadio->setObjectName(QStringLiteral("CurrentRadio"));

        verticalLayout_2->addWidget(CurrentRadio);

        PastRadio = new QRadioButton(groupBox_3);
        PastRadio->setObjectName(QStringLiteral("PastRadio"));

        verticalLayout_2->addWidget(PastRadio);


        horizontalLayout_2->addWidget(groupBox_3);

        horizontalSpacer_4 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_2->addItem(horizontalSpacer_4);

        HeaderTabs->addTab(EmployeeSettings, QString());
        ProjectsSettings = new QWidget();
        ProjectsSettings->setObjectName(QStringLiteral("ProjectsSettings"));
        horizontalLayout_7 = new QHBoxLayout(ProjectsSettings);
        horizontalLayout_7->setObjectName(QStringLiteral("horizontalLayout_7"));
        horizontalLayout_7->setContentsMargins(-1, 2, -1, 2);
        groupBox_6 = new QGroupBox(ProjectsSettings);
        groupBox_6->setObjectName(QStringLiteral("groupBox_6"));
        horizontalLayout_9 = new QHBoxLayout(groupBox_6);
        horizontalLayout_9->setSpacing(2);
        horizontalLayout_9->setObjectName(QStringLiteral("horizontalLayout_9"));
        horizontalLayout_9->setContentsMargins(9, 0, -1, 4);
        ProjectAdd = new QPushButton(groupBox_6);
        ProjectAdd->setObjectName(QStringLiteral("ProjectAdd"));

        horizontalLayout_9->addWidget(ProjectAdd);

        ProjectDelete = new QPushButton(groupBox_6);
        ProjectDelete->setObjectName(QStringLiteral("ProjectDelete"));

        horizontalLayout_9->addWidget(ProjectDelete);

        ProjectArchive = new QPushButton(groupBox_6);
        ProjectArchive->setObjectName(QStringLiteral("ProjectArchive"));

        horizontalLayout_9->addWidget(ProjectArchive);


        horizontalLayout_7->addWidget(groupBox_6);

        groupBox_8 = new QGroupBox(ProjectsSettings);
        groupBox_8->setObjectName(QStringLiteral("groupBox_8"));
        gridLayout_9 = new QGridLayout(groupBox_8);
        gridLayout_9->setSpacing(2);
        gridLayout_9->setObjectName(QStringLiteral("gridLayout_9"));
        gridLayout_9->setContentsMargins(-1, 0, -1, 4);
        ProjectName = new QCheckBox(groupBox_8);
        ProjectName->setObjectName(QStringLiteral("ProjectName"));

        gridLayout_9->addWidget(ProjectName, 0, 0, 1, 1);

        ProjectId = new QCheckBox(groupBox_8);
        ProjectId->setObjectName(QStringLiteral("ProjectId"));

        gridLayout_9->addWidget(ProjectId, 1, 0, 1, 1);

        ProjectCurrent = new QCheckBox(groupBox_8);
        ProjectCurrent->setObjectName(QStringLiteral("ProjectCurrent"));

        gridLayout_9->addWidget(ProjectCurrent, 0, 1, 1, 1);


        horizontalLayout_7->addWidget(groupBox_8);

        groupBox_9 = new QGroupBox(ProjectsSettings);
        groupBox_9->setObjectName(QStringLiteral("groupBox_9"));
        verticalLayout_3 = new QVBoxLayout(groupBox_9);
        verticalLayout_3->setSpacing(2);
        verticalLayout_3->setObjectName(QStringLiteral("verticalLayout_3"));
        verticalLayout_3->setContentsMargins(-1, 0, -1, 4);
        ProjectAllRadio = new QRadioButton(groupBox_9);
        ProjectAllRadio->setObjectName(QStringLiteral("ProjectAllRadio"));

        verticalLayout_3->addWidget(ProjectAllRadio);

        ProjectCurrentRadio = new QRadioButton(groupBox_9);
        ProjectCurrentRadio->setObjectName(QStringLiteral("ProjectCurrentRadio"));

        verticalLayout_3->addWidget(ProjectCurrentRadio);

        ProjectPastRadio = new QRadioButton(groupBox_9);
        ProjectPastRadio->setObjectName(QStringLiteral("ProjectPastRadio"));

        verticalLayout_3->addWidget(ProjectPastRadio);


        horizontalLayout_7->addWidget(groupBox_9);

        horizontalSpacer_6 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_7->addItem(horizontalSpacer_6);

        HeaderTabs->addTab(ProjectsSettings, QString());
        ItemsSettings = new QWidget();
        ItemsSettings->setObjectName(QStringLiteral("ItemsSettings"));
        horizontalLayout_8 = new QHBoxLayout(ItemsSettings);
        horizontalLayout_8->setObjectName(QStringLiteral("horizontalLayout_8"));
        horizontalLayout_8->setContentsMargins(-1, 2, -1, 2);
        groupBox_7 = new QGroupBox(ItemsSettings);
        groupBox_7->setObjectName(QStringLiteral("groupBox_7"));
        horizontalLayout_10 = new QHBoxLayout(groupBox_7);
        horizontalLayout_10->setObjectName(QStringLiteral("horizontalLayout_10"));
        ItemAdd = new QPushButton(groupBox_7);
        ItemAdd->setObjectName(QStringLiteral("ItemAdd"));

        horizontalLayout_10->addWidget(ItemAdd);

        ItemDelete = new QPushButton(groupBox_7);
        ItemDelete->setObjectName(QStringLiteral("ItemDelete"));

        horizontalLayout_10->addWidget(ItemDelete);


        horizontalLayout_8->addWidget(groupBox_7);

        groupBox_10 = new QGroupBox(ItemsSettings);
        groupBox_10->setObjectName(QStringLiteral("groupBox_10"));
        gridLayout_10 = new QGridLayout(groupBox_10);
        gridLayout_10->setObjectName(QStringLiteral("gridLayout_10"));
        ItemName = new QCheckBox(groupBox_10);
        ItemName->setObjectName(QStringLiteral("ItemName"));

        gridLayout_10->addWidget(ItemName, 0, 0, 1, 1);

        ItemId = new QCheckBox(groupBox_10);
        ItemId->setObjectName(QStringLiteral("ItemId"));

        gridLayout_10->addWidget(ItemId, 1, 0, 1, 1);

        ItemSub = new QCheckBox(groupBox_10);
        ItemSub->setObjectName(QStringLiteral("ItemSub"));

        gridLayout_10->addWidget(ItemSub, 1, 1, 1, 1);

        ItemCategory = new QCheckBox(groupBox_10);
        ItemCategory->setObjectName(QStringLiteral("ItemCategory"));

        gridLayout_10->addWidget(ItemCategory, 0, 1, 1, 1);

        ItemDimension = new QCheckBox(groupBox_10);
        ItemDimension->setObjectName(QStringLiteral("ItemDimension"));

        gridLayout_10->addWidget(ItemDimension, 0, 2, 1, 1);


        horizontalLayout_8->addWidget(groupBox_10);

        horizontalSpacer_7 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_8->addItem(horizontalSpacer_7);

        HeaderTabs->addTab(ItemsSettings, QString());
        ShiftSettings = new QWidget();
        ShiftSettings->setObjectName(QStringLiteral("ShiftSettings"));
        horizontalLayout_3 = new QHBoxLayout(ShiftSettings);
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        horizontalLayout_3->setContentsMargins(-1, 2, -1, 2);
        groupBox_4 = new QGroupBox(ShiftSettings);
        groupBox_4->setObjectName(QStringLiteral("groupBox_4"));
        horizontalLayout_6 = new QHBoxLayout(groupBox_4);
        horizontalLayout_6->setObjectName(QStringLiteral("horizontalLayout_6"));
        ShiftAdd = new QPushButton(groupBox_4);
        ShiftAdd->setObjectName(QStringLiteral("ShiftAdd"));

        horizontalLayout_6->addWidget(ShiftAdd);

        ShiftEdit = new QPushButton(groupBox_4);
        ShiftEdit->setObjectName(QStringLiteral("ShiftEdit"));

        horizontalLayout_6->addWidget(ShiftEdit);

        ShiftDelete = new QPushButton(groupBox_4);
        ShiftDelete->setObjectName(QStringLiteral("ShiftDelete"));

        horizontalLayout_6->addWidget(ShiftDelete);


        horizontalLayout_3->addWidget(groupBox_4);

        groupBox_5 = new QGroupBox(ShiftSettings);
        groupBox_5->setObjectName(QStringLiteral("groupBox_5"));
        gridLayout = new QGridLayout(groupBox_5);
        gridLayout->setSpacing(2);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        gridLayout->setContentsMargins(6, 0, 6, 6);
        ShiftProjectRadio = new QRadioButton(groupBox_5);
        ShiftProjectRadio->setObjectName(QStringLiteral("ShiftProjectRadio"));

        gridLayout->addWidget(ShiftProjectRadio, 2, 0, 1, 1);

        ShiftItemCombo = new QComboBox(groupBox_5);
        ShiftItemCombo->setObjectName(QStringLiteral("ShiftItemCombo"));
        QFont font1;
        font1.setPointSize(9);
        ShiftItemCombo->setFont(font1);
        ShiftItemCombo->setSizeAdjustPolicy(QComboBox::AdjustToContents);

        gridLayout->addWidget(ShiftItemCombo, 2, 1, 1, 1);

        ShiftEmployeeRadio = new QRadioButton(groupBox_5);
        ShiftEmployeeRadio->setObjectName(QStringLiteral("ShiftEmployeeRadio"));

        gridLayout->addWidget(ShiftEmployeeRadio, 0, 0, 1, 1);

        ShiftEmployeeCombo = new QComboBox(groupBox_5);
        ShiftEmployeeCombo->setObjectName(QStringLiteral("ShiftEmployeeCombo"));
        ShiftEmployeeCombo->setFont(font1);
        ShiftEmployeeCombo->setSizeAdjustPolicy(QComboBox::AdjustToContents);

        gridLayout->addWidget(ShiftEmployeeCombo, 0, 1, 1, 1);

        ShiftItemRadio = new QRadioButton(groupBox_5);
        ShiftItemRadio->setObjectName(QStringLiteral("ShiftItemRadio"));

        gridLayout->addWidget(ShiftItemRadio, 1, 0, 1, 1);

        ShiftProjectCombo = new QComboBox(groupBox_5);
        ShiftProjectCombo->setObjectName(QStringLiteral("ShiftProjectCombo"));
        ShiftProjectCombo->setFont(font1);
        ShiftProjectCombo->setSizeAdjustPolicy(QComboBox::AdjustToContents);

        gridLayout->addWidget(ShiftProjectCombo, 1, 1, 1, 1);


        horizontalLayout_3->addWidget(groupBox_5);

        horizontalSpacer_5 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_3->addItem(horizontalSpacer_5);

        HeaderTabs->addTab(ShiftSettings, QString());

        gridLayout_7->addWidget(HeaderTabs, 1, 0, 1, 1);

        mainStack->addWidget(advPage);

        _2->addWidget(mainStack, 0, 1, 1, 1);

        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setSpacing(0);
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        horizontalLayout->setSizeConstraint(QLayout::SetMinimumSize);
        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout->addItem(horizontalSpacer);

        mainFinish = new QPushButton(MainForm);
        mainFinish->setObjectName(QStringLiteral("mainFinish"));

        horizontalLayout->addWidget(mainFinish);


        _2->addLayout(horizontalLayout, 1, 1, 1, 1);


        retranslateUi(MainForm);

        mainStack->setCurrentIndex(1);
        MainTabs->setCurrentIndex(3);
        HeaderTabs->setCurrentIndex(3);


        QMetaObject::connectSlotsByName(MainForm);
    } // setupUi

    void retranslateUi(QWidget *MainForm)
    {
        MainForm->setWindowTitle(QApplication::translate("MainForm", "Form", 0));
        basicPageClockIn->setText(QApplication::translate("MainForm", "Clock In", 0));
        basicPageClockOut->setText(QApplication::translate("MainForm", "Clock out", 0));
        basicPageAdvanced->setText(QApplication::translate("MainForm", "Advanced", 0));
        MainTabs->setTabText(MainTabs->indexOf(EmployeeTab), QApplication::translate("MainForm", "Employees", 0));
        MainTabs->setTabText(MainTabs->indexOf(ProjectTab), QApplication::translate("MainForm", "Projects", 0));
        MainTabs->setTabText(MainTabs->indexOf(ItemTab), QApplication::translate("MainForm", "Items", 0));
        MainTabs->setTabText(MainTabs->indexOf(ShiftTab), QApplication::translate("MainForm", "Shifts", 0));
        pushButton_4->setText(QApplication::translate("MainForm", "Confirm", 0));
        pushButton_3->setText(QApplication::translate("MainForm", "Cancel", 0));
        groupBox->setTitle(QApplication::translate("MainForm", "Options", 0));
        EmployeeAdd->setText(QApplication::translate("MainForm", "Add", 0));
        EmployeeArchive->setText(QApplication::translate("MainForm", "Archive", 0));
        EmployeeDelete->setText(QApplication::translate("MainForm", "Delete", 0));
        groupBox_2->setTitle(QApplication::translate("MainForm", "Table", 0));
        EmployeeName->setText(QApplication::translate("MainForm", "Name", 0));
        EmployeeActive->setText(QApplication::translate("MainForm", "Active", 0));
        EmployeeShiftCount->setText(QApplication::translate("MainForm", "ShiftCount", 0));
        EmployeeAdminStatus->setText(QApplication::translate("MainForm", "AdminStatus", 0));
        EmployeePin->setText(QApplication::translate("MainForm", "Pin", 0));
        EmployeeId->setText(QApplication::translate("MainForm", "Id", 0));
        EmployeeCurrent->setText(QApplication::translate("MainForm", "Current", 0));
        groupBox_3->setTitle(QApplication::translate("MainForm", "Show", 0));
        AllRadio->setText(QApplication::translate("MainForm", "All Employees", 0));
        CurrentRadio->setText(QApplication::translate("MainForm", "Current Employees", 0));
        PastRadio->setText(QApplication::translate("MainForm", "Past Employees", 0));
        HeaderTabs->setTabText(HeaderTabs->indexOf(EmployeeSettings), QApplication::translate("MainForm", "Employees", 0));
        groupBox_6->setTitle(QApplication::translate("MainForm", "Options", 0));
        ProjectAdd->setText(QApplication::translate("MainForm", "Create New", 0));
        ProjectDelete->setText(QApplication::translate("MainForm", "Delete", 0));
        ProjectArchive->setText(QApplication::translate("MainForm", "Archive", 0));
        groupBox_8->setTitle(QApplication::translate("MainForm", "Table", 0));
        ProjectName->setText(QApplication::translate("MainForm", "Name", 0));
        ProjectId->setText(QApplication::translate("MainForm", "Id", 0));
        ProjectCurrent->setText(QApplication::translate("MainForm", "Current", 0));
        groupBox_9->setTitle(QApplication::translate("MainForm", "Show", 0));
        ProjectAllRadio->setText(QApplication::translate("MainForm", "All Projects", 0));
        ProjectCurrentRadio->setText(QApplication::translate("MainForm", "Current Projects", 0));
        ProjectPastRadio->setText(QApplication::translate("MainForm", "Past Projects", 0));
        HeaderTabs->setTabText(HeaderTabs->indexOf(ProjectsSettings), QApplication::translate("MainForm", "Projects", 0));
        groupBox_7->setTitle(QApplication::translate("MainForm", "Options", 0));
        ItemAdd->setText(QApplication::translate("MainForm", "Create New", 0));
        ItemDelete->setText(QApplication::translate("MainForm", "Delete", 0));
        groupBox_10->setTitle(QApplication::translate("MainForm", "Table", 0));
        ItemName->setText(QApplication::translate("MainForm", "Name", 0));
        ItemId->setText(QApplication::translate("MainForm", "Id", 0));
        ItemSub->setText(QApplication::translate("MainForm", "Sub-Category", 0));
        ItemCategory->setText(QApplication::translate("MainForm", "Category", 0));
        ItemDimension->setText(QApplication::translate("MainForm", "Dimension", 0));
        HeaderTabs->setTabText(HeaderTabs->indexOf(ItemsSettings), QApplication::translate("MainForm", "Items", 0));
        groupBox_4->setTitle(QApplication::translate("MainForm", "Options", 0));
        ShiftAdd->setText(QApplication::translate("MainForm", "Add", 0));
        ShiftEdit->setText(QApplication::translate("MainForm", "Edit", 0));
        ShiftDelete->setText(QApplication::translate("MainForm", "Delete", 0));
        groupBox_5->setTitle(QApplication::translate("MainForm", "Display By", 0));
        ShiftProjectRadio->setText(QApplication::translate("MainForm", "Item", 0));
        ShiftEmployeeRadio->setText(QApplication::translate("MainForm", "Employee", 0));
        ShiftItemRadio->setText(QApplication::translate("MainForm", "Project", 0));
        HeaderTabs->setTabText(HeaderTabs->indexOf(ShiftSettings), QApplication::translate("MainForm", "Shifts", 0));
        mainFinish->setText(QApplication::translate("MainForm", "Finish", 0));
    } // retranslateUi

};

namespace Ui {
    class MainForm: public Ui_MainForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINFORM_H
