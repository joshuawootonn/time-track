/********************************************************************************
** Form generated from reading UI file 'clockoutform.ui'
**
** Created by: Qt User Interface Compiler version 5.9.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_CLOCKOUTFORM_H
#define UI_CLOCKOUTFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QTableWidget>
#include <QtWidgets/QTextEdit>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_ClockoutForm
{
public:
    QGridLayout *gridLayout;
    QSpacerItem *horizontalSpacer_3;
    QSpacerItem *verticalSpacer;
    QSpacerItem *horizontalSpacer_2;
    QSpacerItem *verticalSpacer_2;
    QWidget *bigwidger;
    QGridLayout *gridLayout_2;
    QHBoxLayout *horizontalLayout;
    QVBoxLayout *verticalLayout_3;
    QTableWidget *Sections;
    QWidget *DescriptionWidget;
    QHBoxLayout *horizontalLayout_3;
    QLabel *label_2;
    QTextEdit *Description;
    QHBoxLayout *horizontalLayout_2;
    QPushButton *FinishedButton;
    QPushButton *CancelButton;
    QHBoxLayout *horizontalLayout_10;
    QLabel *label;
    QLabel *timeLeft;
    QSpacerItem *horizontalSpacer;
    QHBoxLayout *horizontalLayout_4;
    QVBoxLayout *verticalLayout_2;
    QLabel *label_3;
    QLabel *label_4;
    QLabel *label_5;
    QLabel *label_7;
    QLabel *label_6;
    QVBoxLayout *verticalLayout_4;
    QHBoxLayout *horizontalLayout_9;
    QComboBox *Projects;
    QHBoxLayout *horizontalLayout_5;
    QComboBox *Items;
    QHBoxLayout *horizontalLayout_6;
    QComboBox *Hours;
    QLabel *label_8;
    QComboBox *Minutes;
    QHBoxLayout *horizontalLayout_8;
    QPushButton *Add;
    QPushButton *Delete;
    QHBoxLayout *horizontalLayout_7;
    QComboBox *Lunch;

    void setupUi(QWidget *ClockoutForm)
    {
        if (ClockoutForm->objectName().isEmpty())
            ClockoutForm->setObjectName(QStringLiteral("ClockoutForm"));
        ClockoutForm->resize(1136, 541);
        QFont font;
        font.setFamily(QStringLiteral("Calibri"));
        ClockoutForm->setFont(font);
        ClockoutForm->setStyleSheet(QLatin1String("QWidget#ClockoutForm{\n"
"\n"
"background-color:#E5EAE7;\n"
"}\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 26px;\n"
"\n"
"}\n"
"\n"
"\n"
"\n"
"QStackedWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"QWidget{\n"
"\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"QWidget#bigwidger{\n"
"background-color:#E5EAE7;\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"\n"
"QTableWidget{\n"
"border:none;\n"
"}\n"
"QTextEdit{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QPushButton:hover:!pressed{\n"
"background-color:#E4E9EB;\n"
"}\n"
"\n"
"\n"
"QDateTimeEdit{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QDateEditTime:hover{\n"
"border:none;\n"
"background-color:#E4E9EB;\n"
"}\n"
"QDateEditTime::drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QComboBox{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"\n"
"}\n"
"\n"
"QComboBox:hover {\n"
"background-color:#E4E9EB;\n"
"}\n"
"QComboBox:drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
""
                        "QRadioButton{\n"
"padding:0px;\n"
"margin:0px;\n"
"}\n"
"\n"
"\n"
"QGroupBox {\n"
"    border: 0px solid gray;\n"
"	\n"
"    margin-top: 0.5em;\n"
"	margin-right:0px;\n"
"	margin-left:0px;\n"
"}\n"
"QGroupBox::title {\n"
"    subcontrol-origin: margin;\n"
"    left: 10px;\n"
"    padding: 0 3px 0 3px;\n"
"}\n"
""));
        gridLayout = new QGridLayout(ClockoutForm);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        horizontalSpacer_3 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        gridLayout->addItem(horizontalSpacer_3, 1, 0, 1, 1);

        verticalSpacer = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        gridLayout->addItem(verticalSpacer, 0, 1, 1, 1);

        horizontalSpacer_2 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        gridLayout->addItem(horizontalSpacer_2, 1, 2, 1, 1);

        verticalSpacer_2 = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        gridLayout->addItem(verticalSpacer_2, 2, 1, 1, 1);

        bigwidger = new QWidget(ClockoutForm);
        bigwidger->setObjectName(QStringLiteral("bigwidger"));
        gridLayout_2 = new QGridLayout(bigwidger);
        gridLayout_2->setObjectName(QStringLiteral("gridLayout_2"));
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        verticalLayout_3 = new QVBoxLayout();
        verticalLayout_3->setObjectName(QStringLiteral("verticalLayout_3"));
        Sections = new QTableWidget(bigwidger);
        Sections->setObjectName(QStringLiteral("Sections"));
        Sections->setMinimumSize(QSize(500, 0));
        Sections->verticalHeader()->setMinimumSectionSize(30);

        verticalLayout_3->addWidget(Sections);

        DescriptionWidget = new QWidget(bigwidger);
        DescriptionWidget->setObjectName(QStringLiteral("DescriptionWidget"));
        DescriptionWidget->setMaximumSize(QSize(16777215, 35));
        horizontalLayout_3 = new QHBoxLayout(DescriptionWidget);
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        label_2 = new QLabel(DescriptionWidget);
        label_2->setObjectName(QStringLiteral("label_2"));
        label_2->setMaximumSize(QSize(16777215, 35));

        horizontalLayout_3->addWidget(label_2);

        Description = new QTextEdit(DescriptionWidget);
        Description->setObjectName(QStringLiteral("Description"));
        Description->setMaximumSize(QSize(16777215, 35));

        horizontalLayout_3->addWidget(Description);


        verticalLayout_3->addWidget(DescriptionWidget);


        horizontalLayout->addLayout(verticalLayout_3);


        gridLayout_2->addLayout(horizontalLayout, 0, 2, 1, 1);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        FinishedButton = new QPushButton(bigwidger);
        FinishedButton->setObjectName(QStringLiteral("FinishedButton"));
        FinishedButton->setMinimumSize(QSize(100, 50));

        horizontalLayout_2->addWidget(FinishedButton);

        CancelButton = new QPushButton(bigwidger);
        CancelButton->setObjectName(QStringLiteral("CancelButton"));
        CancelButton->setMinimumSize(QSize(100, 50));

        horizontalLayout_2->addWidget(CancelButton);


        gridLayout_2->addLayout(horizontalLayout_2, 2, 2, 1, 1);

        horizontalLayout_10 = new QHBoxLayout();
        horizontalLayout_10->setObjectName(QStringLiteral("horizontalLayout_10"));
        label = new QLabel(bigwidger);
        label->setObjectName(QStringLiteral("label"));

        horizontalLayout_10->addWidget(label);

        timeLeft = new QLabel(bigwidger);
        timeLeft->setObjectName(QStringLiteral("timeLeft"));

        horizontalLayout_10->addWidget(timeLeft);

        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_10->addItem(horizontalSpacer);


        gridLayout_2->addLayout(horizontalLayout_10, 2, 1, 1, 1);

        horizontalLayout_4 = new QHBoxLayout();
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));
        verticalLayout_2 = new QVBoxLayout();
        verticalLayout_2->setObjectName(QStringLiteral("verticalLayout_2"));
        label_3 = new QLabel(bigwidger);
        label_3->setObjectName(QStringLiteral("label_3"));
        QSizePolicy sizePolicy(QSizePolicy::Fixed, QSizePolicy::Preferred);
        sizePolicy.setHorizontalStretch(0);
        sizePolicy.setVerticalStretch(0);
        sizePolicy.setHeightForWidth(label_3->sizePolicy().hasHeightForWidth());
        label_3->setSizePolicy(sizePolicy);
        label_3->setMinimumSize(QSize(100, 0));

        verticalLayout_2->addWidget(label_3);

        label_4 = new QLabel(bigwidger);
        label_4->setObjectName(QStringLiteral("label_4"));
        label_4->setMinimumSize(QSize(100, 0));

        verticalLayout_2->addWidget(label_4);

        label_5 = new QLabel(bigwidger);
        label_5->setObjectName(QStringLiteral("label_5"));
        label_5->setMinimumSize(QSize(120, 0));

        verticalLayout_2->addWidget(label_5);

        label_7 = new QLabel(bigwidger);
        label_7->setObjectName(QStringLiteral("label_7"));

        verticalLayout_2->addWidget(label_7);

        label_6 = new QLabel(bigwidger);
        label_6->setObjectName(QStringLiteral("label_6"));
        label_6->setMinimumSize(QSize(100, 0));

        verticalLayout_2->addWidget(label_6);


        horizontalLayout_4->addLayout(verticalLayout_2);

        verticalLayout_4 = new QVBoxLayout();
        verticalLayout_4->setObjectName(QStringLiteral("verticalLayout_4"));
        horizontalLayout_9 = new QHBoxLayout();
        horizontalLayout_9->setObjectName(QStringLiteral("horizontalLayout_9"));
        Projects = new QComboBox(bigwidger);
        Projects->setObjectName(QStringLiteral("Projects"));
        Projects->setMinimumSize(QSize(200, 50));
        Projects->setSizeAdjustPolicy(QComboBox::AdjustToContents);

        horizontalLayout_9->addWidget(Projects);


        verticalLayout_4->addLayout(horizontalLayout_9);

        horizontalLayout_5 = new QHBoxLayout();
        horizontalLayout_5->setObjectName(QStringLiteral("horizontalLayout_5"));
        Items = new QComboBox(bigwidger);
        Items->setObjectName(QStringLiteral("Items"));
        Items->setMinimumSize(QSize(200, 50));

        horizontalLayout_5->addWidget(Items);


        verticalLayout_4->addLayout(horizontalLayout_5);

        horizontalLayout_6 = new QHBoxLayout();
        horizontalLayout_6->setObjectName(QStringLiteral("horizontalLayout_6"));
        Hours = new QComboBox(bigwidger);
        Hours->setObjectName(QStringLiteral("Hours"));
        Hours->setMinimumSize(QSize(100, 50));
        Hours->setEditable(false);

        horizontalLayout_6->addWidget(Hours);

        label_8 = new QLabel(bigwidger);
        label_8->setObjectName(QStringLiteral("label_8"));
        label_8->setMinimumSize(QSize(8, 0));
        label_8->setMaximumSize(QSize(8, 16777215));

        horizontalLayout_6->addWidget(label_8);

        Minutes = new QComboBox(bigwidger);
        Minutes->setObjectName(QStringLiteral("Minutes"));
        Minutes->setMinimumSize(QSize(100, 50));
        Minutes->setEditable(false);

        horizontalLayout_6->addWidget(Minutes);


        verticalLayout_4->addLayout(horizontalLayout_6);

        horizontalLayout_8 = new QHBoxLayout();
        horizontalLayout_8->setObjectName(QStringLiteral("horizontalLayout_8"));
        Add = new QPushButton(bigwidger);
        Add->setObjectName(QStringLiteral("Add"));
        Add->setMinimumSize(QSize(100, 50));

        horizontalLayout_8->addWidget(Add);

        Delete = new QPushButton(bigwidger);
        Delete->setObjectName(QStringLiteral("Delete"));
        Delete->setMinimumSize(QSize(100, 50));

        horizontalLayout_8->addWidget(Delete);


        verticalLayout_4->addLayout(horizontalLayout_8);

        horizontalLayout_7 = new QHBoxLayout();
        horizontalLayout_7->setObjectName(QStringLiteral("horizontalLayout_7"));
        horizontalLayout_7->setSizeConstraint(QLayout::SetDefaultConstraint);
        Lunch = new QComboBox(bigwidger);
        Lunch->setObjectName(QStringLiteral("Lunch"));
        Lunch->setMinimumSize(QSize(200, 50));
        Lunch->setEditable(false);

        horizontalLayout_7->addWidget(Lunch);


        verticalLayout_4->addLayout(horizontalLayout_7);


        horizontalLayout_4->addLayout(verticalLayout_4);


        gridLayout_2->addLayout(horizontalLayout_4, 0, 1, 1, 1);


        gridLayout->addWidget(bigwidger, 1, 1, 1, 1);


        retranslateUi(ClockoutForm);

        QMetaObject::connectSlotsByName(ClockoutForm);
    } // setupUi

    void retranslateUi(QWidget *ClockoutForm)
    {
        ClockoutForm->setWindowTitle(QApplication::translate("ClockoutForm", "Time-Track", Q_NULLPTR));
        label_2->setText(QApplication::translate("ClockoutForm", "Notes:", Q_NULLPTR));
        FinishedButton->setText(QApplication::translate("ClockoutForm", "Finish", Q_NULLPTR));
        CancelButton->setText(QApplication::translate("ClockoutForm", "Cancel", Q_NULLPTR));
        label->setText(QApplication::translate("ClockoutForm", "Time Left:", Q_NULLPTR));
        timeLeft->setText(QString());
        label_3->setText(QApplication::translate("ClockoutForm", "Project:", Q_NULLPTR));
        label_4->setText(QApplication::translate("ClockoutForm", "Sub-Project:", Q_NULLPTR));
        label_5->setText(QApplication::translate("ClockoutForm", "Time Worked:", Q_NULLPTR));
        label_7->setText(QString());
        label_6->setText(QApplication::translate("ClockoutForm", "Lunch Taken:", Q_NULLPTR));
        label_8->setText(QApplication::translate("ClockoutForm", ":", Q_NULLPTR));
        Add->setText(QApplication::translate("ClockoutForm", "Add", Q_NULLPTR));
        Delete->setText(QApplication::translate("ClockoutForm", "Delete", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class ClockoutForm: public Ui_ClockoutForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_CLOCKOUTFORM_H
